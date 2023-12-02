<?php

namespace App\Repositories;

use App\Models\Song;

class SongRepository
{

  public function getNotBlacklistedSongs()
  {
    return Song::query()
      ->select('songs.*')
      ->leftJoin('company_song_blacklisted', 'company_song_blacklisted.song_id', '=', 'songs.id')
      ->whereNull('company_song_blacklisted.song_id')
      ->get();
  }
}
