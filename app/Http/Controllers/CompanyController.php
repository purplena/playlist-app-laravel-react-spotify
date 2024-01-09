<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\UserResource;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CompanyController extends Controller
{
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
        User::where('id', $user->id)
            ->update([
                'username' => $request->username,
            ]);

        $company = $user->company;

        if ($request->logo) {
            $logoName = 'logo_'.time().'.'.$request->logo->extension();
            Storage::disk('public')->put($logoName, file_get_contents($request->logo));
            Company::where('id', $company->id)
                ->update([
                    'logo' => $logoName,
                ]);
        }

        Company::where('id', $company->id)
            ->update([
                'name' => $request->name,
                'slug' => $this->generateSlug($request->name),
                'tel' => $request->tel,
                'zip' => $request->zip,
                'country' => $request->country,
                'city' => $request->city,
                'address' => $request->address,
                'background_color' => $request->background_color,
                'font_color' => $request->font_color,
            ]);

        return response()->json(['status' => true, 'user' => new UserResource($user)]);
    }

    protected function generateSlug($str): string
    {
        $words = explode(' ', $str);
        foreach ($words as $key => $word) {
            $words[$key] = strtolower($word);
        }
        if (count($words) > 1) {
            return implode('-', $words);
        } else {
            return strtolower($str);
        }
    }
}
