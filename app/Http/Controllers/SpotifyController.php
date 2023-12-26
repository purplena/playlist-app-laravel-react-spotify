<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SpotifyWebAPI\Session;
use SpotifyWebAPI\SpotifyWebAPI;

class SpotifyController extends Controller
{
  public function redirect()
  {

    $session = new Session(
      config('services.spotify.client_id'),
      config('services.spotify.client_secret'),
      route('spotify.callback')
    );

    $state = $session->generateState();
    $options = [
      'scope' => [
        'playlist-modify-public'
      ],
      'state' => $state,
    ];

    session()->put('spotify.state', $state);

    return redirect($session->getAuthorizeUrl($options));
  }

  public function callback()
  {
    if (request()->query('state') != session()->get('spotify.state')) {
      abort(403);
    }

    $session = new Session(
      config('services.spotify.client_id'),
      config('services.spotify.client_secret'),
      route('spotify.callback')
    );

    $session->requestAccessToken(request()->query('code'));
    $accessToken = $session->getAccessToken();
    $refreshToken = $session->getRefreshToken();

    $api = new SpotifyWebAPI();
    $api->setAccessToken($accessToken);

    $userId = $api->me()->id;
    $playlist = $api->createPlaylist($userId, ['name' => 'Test_Playlist']);

    dd($playlist);
    // regarder si un playlist exist (spotify_data ?null)
    //si null, il faut creer la playlist dans spotify
    // et il faut enregistrer dans ma base de données info de $playlist

  }
}
