<?php

namespace App\Http\Requests;

use App\Models\RequestedSong;
use App\Models\Upvote;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpvoteRequest extends FormRequest
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
            // No validation rules are needed here anymore.
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {

            $userId = $this->user()->id;
            $maxUpvotes = RequestedSong::MAX_SONGS_UPVOTED;
            $timeLimit = now()->subMinutes(RequestedSong::LIMIT_IN_MINS);

            $currentUpvoteCount = Upvote::where('user_id', $userId)
                ->where('created_at', '>=', $timeLimit)
                ->count();

            if ($currentUpvoteCount >= $maxUpvotes) {
                $validator->errors()->add(
                    'limit',
                    trans('validation.max_upvotes_per_user', ['max' => $maxUpvotes])
                );
            }
        });
    }
}
