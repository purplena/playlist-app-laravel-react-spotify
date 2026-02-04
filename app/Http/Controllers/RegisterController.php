<?php

namespace App\Http\Controllers;

use App\Helpers\QrCodeGenerator;
use App\Http\Requests\StoreRegisterCompanyRequest;
use App\Http\Requests\StoreRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Mews\Purifier\Facades\Purifier;

class RegisterController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'username' => $request->username,
            'role' => User::ROLE_CLIENT,
        ]);

        Auth::login($user);

        return response()->json([
            'status' => true,
            'user' => new UserResource($user),
        ]);
    }

    public function storeCompany(StoreRegisterCompanyRequest $request): JsonResponse
    {

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => User::ROLE_OWNER,
        ]);

        $name = $request->name;
        $companySlug = Str::slug($name);

        if ($request->logo) {
            $logoName = 'logo_'.$companySlug.'_'.time().'.'.$request->logo->extension();
            $logoPath = 'logo/'.$logoName;
            Storage::disk('public')->put($logoPath, file_get_contents($request->logo));
        }

        $company = Company::create([
            'name' => $name,
            'slug' => $companySlug,
            'tel' => $request->tel,
            'zip' => $request->zip,
            'country' => $request->country,
            'city' => $request->city,
            'address' => $request->address,
            'description' => Purifier::clean($request->description),
            'logo' => $logoPath ?? null,
            'background_color' => $request->background_color,
            'font_color' => $request->font_color,
        ]);

        $qrCodeName = 'qr_'.$companySlug.'_'.time().'.svg';
        $qrCodePath = 'qr/'.$qrCodeName;
        Storage::disk('public')->put($qrCodePath, QrCodeGenerator::generate($companySlug));

        $company->update(['qr_code' => $qrCodePath]);

        $user->update(['company_id' => $company->id]);
        $user->load('company');

        Auth::login($user);

        return response()->json([
            'status' => true,
            'user' => new UserResource($user),
        ]);
    }
}
