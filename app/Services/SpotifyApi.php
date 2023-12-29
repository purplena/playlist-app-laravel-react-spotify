<?php

namespace App\Services;

use App\Models\Company;
use SpotifyWebAPI\Session;
use SpotifyWebAPI\SpotifyWebAPI;

class SpotifyApi
{
    public function __construct(protected Session $session, protected SpotifyWebAPI $client)
    {
    }

    public function getClient(): SpotifyWebAPI
    {
        return $this->client->setAccessToken($this->getClientCredentialsToken());
    }

    public function getCompanyApiInstance(Company $company): SpotifyWebAPI
    {
        $refreshToken = $company->spotify_playlist_data['refresh_token'];

        $this->session->refreshAccessToken($refreshToken);
        $newAccessToken = $this->session->getAccessToken();
        $newRefreshToken = $this->session->getRefreshToken();

        $api = new SpotifyWebAPI();
        $api->setAccessToken($newAccessToken);

        $company->update([
            'spotify_playlist_data' => array_merge($company->spotify_playlist_data, ['refresh_token' => $newRefreshToken]),
        ]);

        return $api;
    }

    public function generateAuthorizeUrl()
    {
        $state = $this->session->generateState();
        $options = [
            'scope' => [
                'playlist-modify-public',
            ],
            'state' => $state,
        ];

        return ['state' => $state, 'authorizeUrl' => $this->session->getAuthorizeUrl($options)];
    }

    /*
    |--------------------------------------------------------------------------
    | Protected methods
    |--------------------------------------------------------------------------
    */

    protected function getClientCredentialsToken(): string
    {
        $this->session->requestCredentialsToken();

        return $this->session->getAccessToken();
    }
}
