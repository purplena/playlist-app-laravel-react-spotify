<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Song extends Model
{
    use HasFactory;

    protected $fillable = ['spotify_id', 'song_data'];

    protected $casts = [
        'song_data' => 'array',
    ];

    public function requestedSongs(): HasMany
    {
        return $this->hasMany(RequestedSong::class);
    }
}
