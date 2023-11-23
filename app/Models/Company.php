<?php

namespace App\Models;

use App\Models\BlacklistedSong;
use App\Models\RequestedSong;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
  use HasFactory;

  public function users(): HasMany
  {
    return $this->hasMany(User::class);
  }

  public function requestedSongs(): HasMany
  {
    return $this->hasMany(RequestedSong::class);
  }

  public function blacklistedSongs(): BelongsToMany
  {
    return $this->belongsToMany(Song::class, 'blacklisted_songs', 'company_id', 'song_id');
  }

  public function songs(): BelongsToMany
  {
    return $this->belongsToMany(Song::class, 'company_song', 'company_id', 'song_id');
  }
}
