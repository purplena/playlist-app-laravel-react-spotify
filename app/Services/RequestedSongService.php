<?php

namespace App\Services;

use App\Http\DTO\SongDTO;
use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\Upvote;

class RequestedSongService
{
    public function __construct(protected SpotifyApi $spotifyApi)
    {
    }

    public function store(Company $company, string $spotifyId): RequestedSong
    {
        $song = Song::firstOrCreate(
            ['spotify_id' => $spotifyId],
            $this->getTrackInfo($spotifyId)
        );

        return RequestedSong::create([
            'song_id' => $song->id,
            'user_id' => auth()->id(),
            'company_id' => $company->id,
        ]);
    }

    public function upvote(RequestedSong $requestedSong): bool
    {
        $userId = auth()->id();
        $existingUserUpvote = $requestedSong->upvotes()->where('user_id', $userId)->first();

        if ($existingUserUpvote) {
            $existingUserUpvote->delete();
            return false;
        }

        Upvote::create([
            'requested_song_id' => $requestedSong->id,
            'user_id' => $userId,
        ]);

        return true;
    }

    private function getTrackInfo($spotifyId): array
    {
        return SongDTO::fromObjectToArray(
            $this->spotifyApi->getClient()->getTrack($spotifyId)
        );
    }

    public function deleteRequestedSong(RequestedSong $requestedSong): void
    {
        $requestedSong->upvotes()->delete();
        $requestedSong->delete();
        if ($requestedSong->song && $requestedSong->song->requestedSongs()->count() === 0) {
            $requestedSong->song->delete();
        }
    }

    public function deleteAllRequestedSongs(Company $company): void
    {
        $requestedSongIds = $company->requestedSongs()
            ->whereDate('created_at', today())
            ->pluck('id');

        Upvote::whereIn('requested_song_id', $requestedSongIds)
            ->whereDate('created_at', today())
            ->delete();

        $company->requestedSongs()
            ->whereDate('created_at', today())
            ->delete();

        $songsToDelete = Song::whereDoesntHave('requestedSongs')->get();
        foreach ($songsToDelete as $song) {
            $song->delete();
        }
    }
}
