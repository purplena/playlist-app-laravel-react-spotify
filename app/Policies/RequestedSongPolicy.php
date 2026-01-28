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

    public function vote(User $user): bool
    {
        return true;
    }

    public function research(?User $user): bool
    {
        return true;
    }

    public function delete(User $user, RequestedSong $requestedSong)
    {

        return $user->id === $requestedSong->user_id;
    }

    public function managerDelete(User $user, RequestedSong $requestedSong)
    {
        return $requestedSong->company_id === $user->company_id;
    }

    public function managerDeleteAll(User $user): bool
    {
        return $user->company()->exists() && $user->role === User::ROLE_OWNER;
    }
}
