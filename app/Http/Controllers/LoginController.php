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
   * Display a listing of the resource.
   */



  public function index(Request $request)
  {
    //
  }

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

    return response()->json(['status' => false], HttpResponse::HTTP_BAD_REQUEST);
  }

  public function logout(Request $request): JsonResponse
  {
    auth()->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['status' => true, 'message' => 'logged out']);
  }


  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }

  public function me(): JsonResponse
  {
    return response()->json(['status' => true, 'user' => auth()->user()]);
  }
}
