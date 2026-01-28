<?php

namespace App\Services;

use App\Models\RequestedSong;
use App\Models\Upvote;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Validation\ValidationException;

class UpvoteValidationService
{
    /**
     * Check if the user has exceeded their upvote limit.
     *
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function checkLimit(Authenticatable $user): void
    {
        $maxUpvotes = RequestedSong::MAX_SONGS_UPVOTED;
        $timeLimit = now()->subMinutes(RequestedSong::LIMIT_IN_MINS);

        $currentUpvoteCount = Upvote::where('user_id', $user->id)
            ->where('created_at', '>=', $timeLimit)
            ->count();

        if ($currentUpvoteCount >= $maxUpvotes) {
            $message = trans('validation.max_upvotes_per_user', ['max' => $maxUpvotes]);

            throw ValidationException::withMessages([
                'limit' => [$message],
            ]);
        }
    }
}
