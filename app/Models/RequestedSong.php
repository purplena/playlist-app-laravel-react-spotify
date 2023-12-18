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
  protected $fillable = ['song_id', 'user_id', 'company_id'];

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

  public function hasVoted(?User $user): bool
  {
    if ($user) {
      return (bool) $this->upvotes->filter(function ($upvote) use ($user) {
        return $upvote->user_id === $user->id;
      })->count();
    }

    return false;
  }

  // public function hasRequested($spotifyId)
  // {
  //   return $this->song->contains('spotify_id', $spotifyId);
  // }
}
