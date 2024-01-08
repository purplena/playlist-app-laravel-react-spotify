<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterCompanyRequest;
use App\Http\Requests\StoreRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

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

        return response()->json(['status' => true, 'user' => new UserResource($user)]);
    }

    public function storeCompany(StoreRegisterCompanyRequest $request): JsonResponse
    {

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'username' => $request->username,
            'role' => User::ROLE_OWNER,
        ]);

        $logo = 'logo'.time().'.'.$request->logo->extension();
        $fullPath = $request->logo->move(public_path('images'), $logo);
        $relativePath = str_replace(public_path(), '', $fullPath);

        $company = Company::create([
            'name' => $request->name,
            'slug' => $this->generateSlug($request->name),
            'tel' => $request->tel,
            'zip' => $request->zip,
            'country' => $request->country,
            'city' => $request->city,
            'address' => $request->address,
            'logo' => $relativePath,
            'background_color' => $request->background_color,
            'font_color' => $request->font_color,
        ]);

        $url = route('front', ['any' => $company->slug.'/home']);
        $qrCode = QrCode::format('png')->size(300)->generate($url);
        $qrCodeName = 'qr_'.$company->slug.'_'.time().'.png';
        Storage::disk('local')->put($qrCodeName, $qrCode);

        $company->update(['qr_code' => $qrCodeName]);

        $user->update(['company_id' => $company->id]);

        Auth::login($user);

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
