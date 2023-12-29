<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthenticateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\SpotifyApi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Throwable;

class LoginController extends Controller
{
    public function __construct(protected SpotifyApi $spotifyApi)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function authenticate(AuthenticateUserRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = auth()->user()->load('company');

            return response()->json([
                'status' => true,
                'user' => new UserResource($user),
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => __('auth.failed'),
        ], HttpResponse::HTTP_BAD_REQUEST);
    }

    public function logout(Request $request): JsonResponse
    {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['status' => true, 'message' => 'logged out']);
    }

    public function me()
    {
        $user = auth()->user()->load('company');

        if (auth()->user()->role === User::ROLE_OWNER) {
            $company = auth()->user()->company;
            if (Arr::get($company->spotify_playlist_data, 'refresh_token') != null) {
                try {
                    $this->spotifyApi->getCompanyApiInstance($company);
                } catch (Throwable $t) {
                    $company->update([
                        'spotify_playlist_data' => array_merge($company->spotify_playlist_data, ['refresh_token' => null]),
                    ]);
                }
            }
        }

        return response()->json(['status' => true, 'user' => new UserResource($user)]);
    }
}
