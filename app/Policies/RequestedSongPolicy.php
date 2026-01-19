<?php

namespace App\Policies;

use App\Models\RequestedSong;
use App\Models\User;

class RequestedSongPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function delete(User $user, RequestedSong $requestedSong)
    {

        return $user->id === $requestedSong->user_id;
    }
}
