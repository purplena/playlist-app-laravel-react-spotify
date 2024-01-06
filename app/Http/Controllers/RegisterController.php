<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterCompanyRequest;
use App\Http\Requests\StoreRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

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

        return response()->json(['status' => true, 'user' => new UserResource($user)]);
    }

    public function storeCompany(StoreRegisterCompanyRequest $request): JsonResponse
    {
        dd($request);
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'username' => $request->username,
            'role' => User::ROLE_OWNER,
        ]);

        $company = Company::create([
            'name' => $request->name,
            'slug' => $this->generateSlug($request->name),
            'tel' => $request->tel,
            'zip' => $request->zip,
            'country' => $request->country,
            'city' => $request->city,
            'address' => $request->address,
        ]);

        $user->update(['company_id' => $company->id]);

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
