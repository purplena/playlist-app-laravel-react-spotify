<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRegisterRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return
      [
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6|',
        'username' => 'nullable|string',
        'img_path' => 'nullable|string',
        'company_id' => 'nullable|int',
        'role' => 'int'
      ];
  }
}
