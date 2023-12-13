<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException as ValidationValidationException;

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
  public function authenticate(Request $request)
  {

    $credentials = $request->validate([
      'email' => ['required', 'email'],
      'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
      $request->session()->regenerate();

      return response()->json([
        'status' => true,
        'user' => Auth::user()
      ]);
    }

    // if ($validator->fails()) {
    //   return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
    // }
    // $credentials = $request->only('email', 'password');
    // if (auth()->attempt($credentials, $request->filled('remember'))) {
    //   return response()->json(['status' => true, 'user' => auth()->user()]);
    // }
    return response()->json(['status' => false, 'message' => 'invalid username or password'], 500);
  }

  public function logout(Request $request)
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

  public function me()
  {
    return response()->json(['status' => true, 'user' => auth()->user()]);
  }
}
