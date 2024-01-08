<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
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

        if (Storage::disk('local')->exists($qrCodePath)) {
            $streamedResponse = new StreamedResponse(function () use ($qrCodePath) {
                $stream = Storage::disk('local')->readStream($qrCodePath);
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
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        //
    }
}
