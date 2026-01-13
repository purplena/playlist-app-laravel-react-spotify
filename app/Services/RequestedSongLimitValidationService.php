<?php

namespace App\Services;

use App\Models\RequestedSong;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Validation\ValidationException;

class RequestedSongLimitValidationService
{
    /**
     * Check if the user has exceeded their requested songs limit.
     *
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function checkLimit(Authenticatable $user)
    {
        $maxRequestedSongs = RequestedSong::MAX_SONGS_ADDED;
        $timeLimit = now()->subMinutes(RequestedSong::LIMIT_IN_MINS);

        $currentRequestedSongsCount = RequestedSong::where('user_id', $user->id)->where('created_at', '>=', $timeLimit)->count();

        if ($currentRequestedSongsCount >= $maxRequestedSongs) {
            $message = trans('validation.max_songs_per_user', ['max' => $maxRequestedSongs]);

            throw ValidationException::withMessages([
                'message' => [$message],
                'error' => 'song_limit',
            ]);
        }
    }
}
