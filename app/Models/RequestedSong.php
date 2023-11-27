<?php

namespace App\Models;

use App\Models\Company;
use App\Models\Song;
use App\Models\Upvote;
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

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function company(): BelongsTo
  {
    return $this->belongsTo(Company::class);
  }
}
