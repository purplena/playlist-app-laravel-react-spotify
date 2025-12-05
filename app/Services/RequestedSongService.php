<?php

namespace App\Services;

use App\Http\DTO\SongDTO;
use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\Upvote;
use Illuminate\Http\Response;

class RequestedSongService
{
    public function __construct(protected SpotifyApi $spotifyApi)
    {
    }

    public function store(Company $company, string $spotifyId): array
    {
        $userId = auth()->id();

        $requestedSong = RequestedSong::whereHas('song', function ($query) use ($spotifyId) {
            $query->where('spotify_id', $spotifyId)
                ->whereDate('created_at', today());
        })->first();

        if ($requestedSong) {
            return $this->handleExistingRequest($requestedSong);
        }

        $maxSongs = RequestedSong::MAX_SONGS_ADDED;
        $timeLimit = now()->subMinutes(RequestedSong::LIMIT_IN_MINS);

        $currentSongCount = RequestedSong::where('user_id', $userId)
            ->where('created_at', '>=', $timeLimit)
            ->count();

        if ($currentSongCount >= $maxSongs) {
            return [
                'status' => 'error',
                'error' => 'song_limit',
                'code' => 429,
                'message' => "Vous avez déjà ajouté {$maxSongs} chansons dans la dernière heure.",
            ];
        }

        if ($company->blacklistedSongs()->pluck('spotify_id')->contains($spotifyId)) {
            return [
                'status' => 'error',
                'error' => 'blacklisted',
                'code' => 400,
                'message' => "Cette chanson a été blacklistée par l'établissement",
            ];
        }

        $song = Song::firstOrCreate(
            ['spotify_id' => $spotifyId],
            $this->getTrackInfo($spotifyId)
        );

        RequestedSong::create([
            'song_id' => $song->id,
            'user_id' => $userId,
            'company_id' => $company->id,
        ]);

        return [
            'status' => 'added',
            'code' => 201,
            'message' => 'Bravo! Vous avez suggéré une chanson!',
        ];
    }

    public function upvote(RequestedSong $requestedSong): array
    {
        $userId = auth()->id();
        $existingUserUpvote = $requestedSong->upvotes()->where('user_id', $userId)->first();

        if ($existingUserUpvote) {
            $existingUserUpvote->delete();

            return [
                'code' => Response::HTTP_OK,
                'message' => 'Vous avez supprimé votre like',
                'status' => 'like_status',
            ];
        }

        $maxUpvotes = RequestedSong::MAX_SONGS_UPVOTED;
        $timeLimit = now()->subMinutes(RequestedSong::LIMIT_IN_MINS);

        $currentUpvoteCount = Upvote::where('user_id', $userId)
            ->where('created_at', '>=', $timeLimit)
            ->count();

        if ($currentUpvoteCount >= $maxUpvotes) {
            return [
                'code' => 429,
                'message' => "Vous avez déjà liké {$maxUpvotes} chansons dans la dernière heure.",
                'error' => 'upvote_limit',
            ];
        }

        Upvote::create([
            'requested_song_id' => $requestedSong->id,
            'user_id' => $userId,
        ]);

        return [
            'status' => 'like_status',
            'message' => 'Merci pour votre like',
            'code' => Response::HTTP_OK,
        ];
    }

    private function handleExistingRequest(RequestedSong $requestedSong): array
    {
        if ($requestedSong->upvotes()->whereDate('created_at', today())->exists()) {
            return [
                'status' => 'error',
                'error' => 'forbidden',
                'code' => 400,
                'message' => 'Nous ne pouvons pas supprimer cette chanson. Il y a déjà des "likes".',
            ];
        }

        $requestedSong->delete();
        $requestedSong->song()->delete();

        return [
            'status' => 'deleted',
            'code' => 200,
            'message' => 'Cette chanson a été supprimée!',
        ];
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
