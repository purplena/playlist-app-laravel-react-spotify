<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    public function redirect(Request $request)
    {
        session(['companySlug' => $request->get('companySlug')]);

        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {

        $googleUser = Socialite::driver('google')->user();
        $user = User::updateOrCreate(
            ['email' => $googleUser->email],
            [
                'username' => $googleUser->name,
                'google_id' => $googleUser->id,
                'password'=> Str::random(32),
                'role' => User::ROLE_CLIENT,
            ]
        );

        Auth::login($user);
        $companySlug = session('companySlug');

        return redirect(route('front', ['any' => "/{$companySlug}"]));
    }
}
