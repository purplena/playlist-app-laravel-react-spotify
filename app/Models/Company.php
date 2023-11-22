<?php

namespace App\Models;

use App\Models\BlacklistedSong;
use App\Models\RequestedSong;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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

  public function blacklistedSongs(): HasMany
  {
    return $this->hasMany(BlacklistedSong::class);
  }
}
