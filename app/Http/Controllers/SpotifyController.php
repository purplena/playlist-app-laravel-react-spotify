<?php

namespace App\Http\Controllers;

use App\Http\DTO\PlaylistDataDTO;
use App\Services\SpotifyApi;
use Illuminate\Support\Arr;
use SpotifyWebAPI\Session;
use SpotifyWebAPI\SpotifyWebAPI;

class SpotifyController extends Controller
{
    public function __construct(protected SpotifyApi $spotifyApi) {}

    public function redirect()
    {
        $data = $this->spotifyApi->generateAuthorizeUrl();
        session()->put('spotify.state', $data['state']);

        return redirect($data['authorizeUrl']);
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

        $company = auth()->user()->company;
        if (Arr::get($company->spotify_playlist_data, 'refresh_token') == null) {
            $company->update([
                'spotify_playlist_data' => array_merge($company->spotify_playlist_data ? $company->spotify_playlist_data : [], ['refresh_token' => $refreshToken]),
            ]);
        }

        if (Arr::get($company->spotify_playlist_data, 'playlist.id')) {
            return redirect(route('front', ['any' => 'manager']));
        }

        $api = new SpotifyWebAPI;
        $api->setAccessToken($accessToken);

        $userId = $api->me()->id;
        $playlist = $api->createPlaylist($userId, ['name' => $company->name.' Playlist']);

        $playlistData = [
            'playlist' => PlaylistDataDTO::fromObjectToArray($playlist),
            'user_id' => $userId,
            'refresh_token' => $refreshToken,
        ];

        auth()->user()->company->update([
            'spotify_playlist_data' => $playlistData,
        ]);

        return redirect(route('front', ['any' => 'manager']));
    }
}
