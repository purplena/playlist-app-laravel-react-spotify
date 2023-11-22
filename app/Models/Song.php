<?php

namespace App\Models;

use App\Models\RequestedSong;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Song extends Model
{
  use HasFactory;

  public function requestedSongs(): HasMany
  {
    return $this->hasMany(RequestedSong::class);
  }

  public function blacklistedSongs(): HasMany
  {
    return $this->hasMany(BlacklistedSong::class);
  }
}
