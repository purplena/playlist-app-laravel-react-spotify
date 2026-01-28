<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;

class DeleteRequestedSongValidationService
{
    /**
     * Check if the requsted song has upvotes
     *
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function checkIfHasUpvotes($requestedSong)
    {
        $hasUpvotes = $requestedSong->upvotes()->whereDate('created_at', today())->exists();

        if ($hasUpvotes) {
            throw ValidationException::withMessages([
                'message' => [trans('validation.cannot_delete_song_with_upvotes')],
                'error' => 'forbidden',
            ]);
        }
    }
}
