<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\UserResource;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Mews\Purifier\Facades\Purifier;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CompanyController extends Controller
{
    public function show(Company $company)
    {
        return response()->json(['company' => new CompanyResource($company)]);
    }

    public function downloadQrCode(): JsonResponse|StreamedResponse
    {
        $company = auth()->user()->company;
        $qrCodePath = $company->qr_code;

        if (Storage::disk('public')->exists($qrCodePath)) {
            $streamedResponse = new StreamedResponse(function () use ($qrCodePath) {
                $stream = Storage::disk('public')->readStream($qrCodePath);
                fpassthru($stream);
                if (is_resource($stream)) {
                    fclose($stream);
                }
            }, 200, [
                'Content-Type' => 'image/png',
                'Content-disposition' => 'attachment; filename="'.basename($qrCodePath).'"',
            ]);

            return $streamedResponse;
        }

        return response()->json([
            'message' => 'QR Code not found.',
        ], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(UpdateCompanyRequest $request)
    {
        $user = auth()->user();
        $company = $user->company;
        $companySlug = $company->slug;

        if ($request->logo) {
            $logoName = 'logo_'.$companySlug.'_'.time().'.'.$request->logo->extension();
            $logoPath = 'logo/'.$logoName;
            Storage::disk('public')->put($logoPath, file_get_contents($request->logo));
            Company::where('id', $company->id)
                ->update([
                    'logo' => $logoName,
                ]);
        }

        Company::where('id', $company->id)
            ->update([
                'description' => Purifier::clean($request->description),
                'tel' => $request->tel,
                'zip' => $request->zip,
                'country' => $request->country,
                'city' => $request->city,
                'address' => $request->address,
                'background_color' => $request->background_color,
                'font_color' => $request->font_color,
            ]);

        $user->load('company');

        return response()->json([
            'status' => true,
            'user' => new UserResource($user),
        ]);
    }
}
