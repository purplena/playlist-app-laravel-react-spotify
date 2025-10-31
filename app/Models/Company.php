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
        'name',
        'slug',
        'tel',
        'zip',
        'country',
        'city',
        'address',
        'description',
        'spotify_playlist_data',
        'qr_code',
        'logo',
        'background_color',
        'font_color',
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
        return $this->belongsToMany(Song::class, 'company_song_blacklisted', 'company_id', 'song_id')
            ->withTimestamps()
            ->withPivot('id')
            ->using(Blacklist::class);
    }

    public function songs(): BelongsToMany
    {
        return $this->belongsToMany(Song::class, 'company_song', 'company_id', 'song_id')->withTimestamps();
    }
}
