<?php

namespace App\Rules;

use App\Models\RequestedSong;
use App\Models\Upvote;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MaxUpvotesPerUser implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $userId = auth()->id();
        $maxUpvotes = RequestedSong::MAX_SONGS_UPVOTED;
        $timeLimit = now()->subMinutes(RequestedSong::LIMIT_IN_MINS);

        $currentUpvoteCount = Upvote::where('user_id', $userId)
            ->where('created_at', '>=', $timeLimit)
            ->count();

        if ($currentUpvoteCount >= $maxUpvotes) {
            $fail(trans('validation.max_upvotes_per_user', ['max' => $maxUpvotes]));
        }
    }
}
