<?php

namespace App\Http\Controllers;


use App\Http\Requests\AuthenticateUserRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
  /**
   * Store a newly created resource in storage.
   */
  public function authenticate(AuthenticateUserRequest $request): JsonResponse
  {
    $credentials = $request->validated();

    if (Auth::attempt($credentials)) {
      $request->session()->regenerate();

      return response()->json([
        'status' => true,
        'user' => Auth::user()
      ]);
    }

    return response()->json([
      'status' => false,
      'message' => __('auth.failed')
    ], HttpResponse::HTTP_BAD_REQUEST);
  }

  public function logout(Request $request): JsonResponse
  {
    auth()->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['status' => true, 'message' => 'logged out']);
  }

  public function me(): JsonResponse
  {
    return response()->json(['status' => true, 'user' => auth()->user()]);
  }
}
