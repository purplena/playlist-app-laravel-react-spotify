<?php

namespace App\Http\Controllers;

use App\Http\DTO\SongDTO;
use App\Http\Resources\RequestedSongResource;
use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\Upvote;
use App\Repositories\SongRepository;
use App\Services\SpotifyApi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class RequestedSongController extends Controller
{
    public function __construct(protected SpotifyApi $spotifyApi, private SongRepository $songRepository)
    {
        $this->authorizeResource(RequestedSong::class, 'requestedSong');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Company $company): JsonResource
    {
        $requestedSongs = $this->songRepository->getRequestedSongsWithUpvotesCount($company);

        return RequestedSongResource::collection($requestedSongs);
    }

    public function search(Request $request, Company $company): JsonResponse
    {
        $results = $this->spotifyApi->getClient()->search($request->query('q'), 'track');

        $spotifyIdCollection = collect($company->requestedSongs()
            ->with('song')
            ->whereDate('created_at', today())->get())
            ->pluck('song.spotify_id');

        $response = collect($results->tracks->items)->map(function ($track) {
            return SongDTO::fromObjectToArray($track);
        })->map(function ($item) use ($spotifyIdCollection) {
            $item['is_requested'] = $spotifyIdCollection->contains($item['spotify_id']);

            return $item;
        })->toArray();

        return response()->json($response);
    }

    public function upvote(Company $company, RequestedSong $requestedSong): ?JsonResponse
    {
        $userUpvote = $requestedSong->upvotes()->where('user_id', auth()->id())->first();

        if ($userUpvote) {
            $userUpvote->delete();
        } else {
            $upvotes = auth()->user()->upvotes()->where('created_at', '>=', now()->subMinutes(60));
            if ($upvotes->get()->count() >= RequestedSong::MAX_SONGS_UPVOTED) {
                $oldestRequestedSong = $upvotes->oldest('created_at')->first()->created_at;
                $differenceInMinutes = RequestedSong::LIMIT_IN_MINS - (now()->diffInMinutes($oldestRequestedSong));

                return response()->json([
                    'message' => 'Vous avez déjà liké '.RequestedSong::MAX_SONGS_UPVOTED.' chansons. 
                        Vous pouvez liker plus de chansons en '.$differenceInMinutes.' minutes.',
                    'error' => 'upvote_limit',
                ], Response::HTTP_BAD_REQUEST);
            }

            Upvote::create([
                'requested_song_id' => $requestedSong->id,
                'user_id' => auth()->id(),
            ]);
        }

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Company $company, Request $request): JsonResponse
    {
        $spotifyId = $request->spotifyId;
        $requestedSong =
        RequestedSong::whereHas('song', function ($query) use ($spotifyId) {
            $query->where('spotify_id', $spotifyId)->whereDate('created_at', today());
        })->first();

        if ($requestedSong) {
            if ($requestedSong->upvotes()->whereDate('created_at', today())->exists()) {
                return response()->json([
                    'message' => 'Nous ne pouvons pas supprimer cette chanson. Il y a déjà des "likes".',
                    'error' => 'forbidden',
                ], Response::HTTP_BAD_REQUEST);
            }
            $requestedSong->delete();
            $requestedSong->song()->delete();

            return response()->json([
                'message' => 'Cette chanson a été supprimée!',
                'status' => 'deleted',
            ], Response::HTTP_OK);
        } else {
            $requestedSongs = auth()->user()->requestedSongs()->where('created_at', '>=', now()->subMinutes(60));
            if ($requestedSongs->get()->count() >= RequestedSong::MAX_SONGS_ADDED) {
                $oldestRequestedSong = $requestedSongs->oldest('created_at')->first()->created_at;
                $differenceInMinutes = RequestedSong::LIMIT_IN_MINS - (now()->diffInMinutes($oldestRequestedSong));

                return response()->json([
                    'message' => 'Vous avez déjà ajouté '.RequestedSong::MAX_SONGS_ADDED.' chansons. 
                        Vous pouvez ajouter plus de chansons en '.$differenceInMinutes.' minutes.',
                    'error' => 'song_limit',
                ], Response::HTTP_BAD_REQUEST);

            } else {
                if (in_array($spotifyId, $company->blacklistedSongs()->pluck('spotify_id')->toArray())) {
                    return response()->json([
                        'message' => 'Cette chanson a été blacklistée par l\'établissement. 
                        Vous ne pouvez pas l`\'ajouter dans le playlist.',
                        'error' => 'blacklisted',
                    ], Response::HTTP_BAD_REQUEST);
                }

                $song = Song::where(['spotify_id' => $request->spotifyId])
                    ->firstOr(function () use ($request) {
                        return Song::create($this->getTrackInfo($request->spotifyId));
                    });
                RequestedSong::create([
                    'song_id' => $song->id,
                    'user_id' => auth()->id(),
                    'company_id' => $company->id,
                ]);

                return response()->json([
                    'message' => 'Bravo! Vous avez suggéré une chanson!',
                    'status' => 'added',
                ], Response::HTTP_CREATED);
            }
        }
    }

    public function getTrackInfo($spotifyId): array
    {
        return SongDTO::fromObjectToArray(
            $this->spotifyApi->getClient()->getTrack($spotifyId)
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequestedSong $requestedSong): JsonResponse
    {
        $requestedSong->upvotes()->delete();
        RequestedSong::where('id', $requestedSong->id)->delete();

        return response()->json();
    }

    public function destroyAll(): JsonResponse
    {
        $company = auth()->user()->company;
        $requestedSongs = $company->requestedSongs;
        $requestedSongs->each(function ($requestedSong) {
            $requestedSong->upvotes()->whereDate('created_at', today())->delete();
        });
        $company->requestedSongs()->whereDate('created_at', today())->delete();

        return response()->json();
    }
}
