<?php

namespace App\Providers;

use App\Models\RequestedSong;
use App\Services\SpotifyApi;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use SpotifyWebAPI\Session;
use SpotifyWebAPI\SpotifyWebAPI;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(SpotifyApi::class, function () {
            $session = new Session(
                config('services.spotify.client_id'),
                config('services.spotify.client_secret'),
                route('spotify.callback')
            );

            return new SpotifyApi($session, new SpotifyWebAPI);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('song-upvotes', function ($userId) {
            return Limit::perHour(RequestedSong::MAX_SONGS_UPVOTED)->by($userId);
        });

        RateLimiter::for('songs-added', function ($userId) {
            return Limit::perHour(RequestedSong::MAX_SONGS_ADDED)->by($userId);
        });
    }
}
