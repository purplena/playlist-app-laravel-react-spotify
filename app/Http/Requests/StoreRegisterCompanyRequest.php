<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StoreRegisterCompanyRequest extends FormRequest
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
                'password' => [
                    'required',
                    'string',
                    'min:6',
                ],
                'username' => 'nullable|string',
                'company_id' => 'nullable|int',
                'role' => 'int',
                'name' => 'required|string',
                'slug' => 'nullable|string',
                'tel' => 'required|string',
                'zip' => 'required|string',
                'country' => 'required|string',
                'city' => 'required|string',
                'address' => 'required|string',
                'spotify_playlist_data' => 'nullable',
                'qr_code' => 'nullable|string',
                'logo' => ['nullable',
                    'image', 'mimes:jpg,jpeg,png', File::image()->max('2mb'),
                ],
                'background_color' => 'nullable|string',
                'font_color' => 'nullable|string',
            ];
    }
}
