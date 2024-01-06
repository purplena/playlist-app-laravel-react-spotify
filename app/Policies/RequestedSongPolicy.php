<?php

namespace App\Policies;

use App\Models\RequestedSong;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RequestedSongPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function delete(User $user, RequestedSong $requestedSong)
    {
        return $user->company_id === $requestedSong->company_id
                ? Response::allow()
                : Response::deny('You do not own this post.');
    }
}
