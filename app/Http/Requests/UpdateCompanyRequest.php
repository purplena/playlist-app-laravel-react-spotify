<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UpdateCompanyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'nullable|string',
            'name' => 'required|string',
            'slug' => 'nullable|string',
            'tel' => 'required|string',
            'zip' => 'required|string',
            'country' => 'required|string',
            'city' => 'required|string',
            'address' => 'required|string',
            'logo' => ['nullable',
                'image', 'mimes:jpg,jpeg,png', File::image()->max('2mb'),
            ],
            'background_color' => 'nullable|string',
            'font_color' => 'nullable|string',
        ];
    }
}
