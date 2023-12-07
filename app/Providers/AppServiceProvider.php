<?php

namespace App\Providers;

use App\Services\SpotifyApi;
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
        config('services.spotify.client_secret')
      );

      return new SpotifyApi($session, new SpotifyWebAPI());
    });
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    //
  }
}
