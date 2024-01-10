<?php

namespace App\Policies;

use App\Models\Blacklist;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BlacklistPolicy
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

    public function create(User $user)
    {
        return request()->route('requestedSong')->company_id === $user->company_id
            ? Response::allow()
            : Response::deny('You do not own this post.');
    }

    public function delete(User $user, Blacklist $blacklist)
    {
        return $user->company_id === $blacklist->company_id
                ? Response::allow()
                : Response::deny('You do not own this post.');
    }
}
