<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Upvote extends Model
{
    use HasFactory;

    protected $fillable = ['requested_song_id', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function requestedSong(): BelongsTo
    {
        return $this->belongsTo(RequestedSong::class);
    }
}
