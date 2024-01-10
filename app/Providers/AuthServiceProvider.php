<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Blacklist;
use App\Models\RequestedSong;
use App\Policies\BlacklistPolicy;
use App\Policies\RequestedSongPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Blacklist::class => BlacklistPolicy::class,
        RequestedSong::class => RequestedSongPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
