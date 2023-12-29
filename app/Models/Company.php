<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'spotify_playlist_data',
    ];

    protected $casts = [
        'spotify_playlist_data' => 'array',
    ];

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
        return $this->belongsToMany(Song::class, 'company_song_blacklisted', 'company_id', 'song_id')->withTimestamps();
    }

    public function songs(): BelongsToMany
    {
        return $this->belongsToMany(Song::class, 'company_song', 'company_id', 'song_id')->withTimestamps();
    }
}
