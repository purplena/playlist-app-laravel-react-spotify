<?php

namespace App\Services;

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
