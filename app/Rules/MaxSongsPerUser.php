<?php

namespace App\Rules;

use App\Models\RequestedSong;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MaxSongsPerUser implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $userId = auth()->id();
        $maxSongs = RequestedSong::MAX_SONGS_ADDED;
        $timeLimit = now()->subMinutes(RequestedSong::LIMIT_IN_MINS);

        $currentSongCount = RequestedSong::where('user_id', $userId)
            ->where('created_at', '>=', $timeLimit)
            ->count();

        if ($currentSongCount >= $maxSongs) {
            $fail(trans('validation.max_songs_per_user', ['max' => $maxSongs]));
        }
    }
}
