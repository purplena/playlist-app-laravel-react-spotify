<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

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
      "username" => $request->username,
      'role' => User::ROLE_CLIENT
    ]);
    return response()->json(['status' => true, 'user' => $user]);
  }
}
