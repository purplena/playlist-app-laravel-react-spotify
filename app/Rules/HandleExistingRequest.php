<?php

namespace App\Rules;

use App\Models\RequestedSong;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class HandleExistingRequest implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $requestedSong = RequestedSong::whereHas('song', function ($query) use ($value) {
            $query->where('spotify_id', $value)
                ->whereDate('created_at', today());
        })->first();

        if ($requestedSong) {
            if ($requestedSong->upvotes()->whereDate('created_at', today())->exists()) {
                $fail(trans('validation.cannot_delete_song_with_upvotes'));
            } else {
                $requestedSong->delete();
                $requestedSong->song()->delete();
                $fail(trans('validation.song_deleted_successfully'));
            }
        }
    }
}
