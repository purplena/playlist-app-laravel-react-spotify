<?php

namespace App\Http\Requests;

use App\Rules\HandleExistingRequest;
use App\Rules\MaxSongsPerUser;
use App\Rules\NotBlacklisted;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequestedSongRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'spotifyId' => [
                'string',
                new HandleExistingRequest,
                new MaxSongsPerUser,
                new NotBlacklisted($this->route('company')),
            ],
        ];
    }
}
