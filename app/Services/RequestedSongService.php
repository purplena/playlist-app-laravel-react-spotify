<?php

namespace App\Services;

use App\Http\DTO\SongDTO;
use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\Upvote;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\RateLimiter;

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

        if ($company->blacklistedSongs()->pluck('spotify_id')->contains($spotifyId)) {
            return [
                'status' => 'error',
                'error' => 'blacklisted',
                'code' => 400,
                'message' => "Cette chanson a été blacklistée par l'établissement",
            ];
        }

        $limitKey = "songs-added-{$userId}";
        $max = RequestedSong::MAX_SONGS_ADDED;
        $decaySeconds = RequestedSong::LIMIT_IN_MINS * 60;

        $ok = RateLimiter::attempt(
            $limitKey,
            $max,
            function () {
            },
            $decaySeconds
        );

        if (! $ok) {
            $minutes = ceil(RateLimiter::availableIn($limitKey) / 60);

            return [
                'status' => 'error',
                'error' => 'song_limit',
                'code' => 429,
                'message' => "Vous avez déjà ajouté {$max} chansons. "
                    ."Vous pourrez ajouter plus de chansons dans {$minutes} minutes.",
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

        $upvotes = auth()->user()->upvotes()->where('created_at', '>=', now()->subMinutes(60));

        if ($upvotes->get()->count() >= RequestedSong::MAX_SONGS_UPVOTED) {
            $key = "upvote-user-{$userId}";
            $max = RequestedSong::MAX_SONGS_UPVOTED;
            $decaySeconds = RequestedSong::LIMIT_IN_MINS * 60;

            $allowedUpvotes = RateLimiter::attempt(
                $key,
                $max,
                function () {
                },
                $decaySeconds
            );

            if (! $allowedUpvotes) {
                $seconds = RateLimiter::availableIn($key);
                $minutes = ceil($seconds / 60);

                return [
                    'code' => 429,
                    'message' => "Vous avez déjà liké {$max} chansons. "
                        ."Vous pourrez liker dans {$minutes} minutes.",
                    'error' => 'upvote_limit',
                ];
            }
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
}
