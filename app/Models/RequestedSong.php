<?php

namespace App\Models;

use App\Models\Song;
use App\Models\UpvotedSong;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RequestedSong extends Model
{
  use HasFactory;

  public function upvotes(): HasMany
  {
    return $this->hasMany(Upvote::class);
  }
  public function song(): BelongsTo
  {
    return $this->belongsTo(Song::class);
  }
}
