<?php

namespace App\Repositories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Collection;

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

  public function getRequestedSongsWithUpvotesCount($company)
  {
    return $company->requestedSongs()->with('song', 'upvotes')
      ->withCount('upvotes')
      ->whereDate('created_at', today())
      ->orderBy('upvotes_count', 'desc')
      ->get();
  }
}
