<?php

namespace App\Http\DTO;

class SongDTO
{
  public static function fromObjectToArray(object $track): array
  {
    return [
      'spotify_id' => $track->id,
      'song_data' => [
        'song_name' => $track->name,
        'artist_name' => $track->artists[0]->name,
        'album_cover_img' => $track->album->images[0]->url
      ]
    ];
  }
}
