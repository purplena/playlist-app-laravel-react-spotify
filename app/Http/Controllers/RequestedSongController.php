<?php

namespace App\Http\Controllers;

use App\Http\DTO\SongDTO;
use App\Http\Requests\StoreRequestedSongRequest;
use App\Http\Resources\RequestedSongResource;
use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\Upvote;
use App\Repositories\SongRepository;
use App\Services\DeleteRequestedSongValidationService;
use App\Services\RequestedSongLimitValidationService;
use App\Services\SpotifyApi;
use App\Services\UpvoteValidationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class RequestedSongController extends Controller
{
    public function __construct(
        protected SpotifyApi $spotifyApi,
        private SongRepository $songRepository,
    ) {
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

    public function upvote(Company $company, RequestedSong $requestedSong, UpvoteValidationService $upvoteValidator): JsonResponse
    {
        $user = auth()->user();
        $userUpvote = $requestedSong->upvotes()->where('user_id', $user->id)->first();

        if ($userUpvote) {
            $userUpvote->delete();
        }

        $upvoteValidator->checkLimit($user);

        Upvote::create([
            'requested_song_id' => $requestedSong->id,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Merci pour votre like',
            'status' => 'like_status',
        ], Response::HTTP_CREATED);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequestedSongRequest $request, Company $company, DeleteRequestedSongValidationService $deleteRequestedSongValidator, RequestedSongLimitValidationService $requestedSongLimitValidator)
    {
        $user = auth()->user();
        $spotifyId = $request->spotifyId;
        $requestedSong =
        RequestedSong::whereHas('song', function ($query) use ($spotifyId) {
            $query->where('spotify_id', $spotifyId)->whereDate('created_at', today());
        })->first();

        if ($requestedSong) {
            $deleteRequestedSongValidator->checkIfHasUpvotes($requestedSong);

            $requestedSong->delete();
            $requestedSong->song()->delete();

            return response()->json([
                'message' => trans('validation.song_deleted_successfully'),
                'status' => 'deleted',
            ], Response::HTTP_OK);
        }

        $requestedSongLimitValidator->checkLimit($user);

        if (in_array($spotifyId, $company->blacklistedSongs()->pluck('spotify_id')->toArray())) {
            return response()->json([
                'message' => trans('validation.song_blacklisted'),
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
            'message' => trans('validation.song_added'),
            'status' => 'added',
        ], Response::HTTP_CREATED);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequestedSong $requestedSong): JsonResponse
    {
        $requestedSong->upvotes()->delete();
        RequestedSong::where('id', $requestedSong->id)->delete();

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }

    public function destroyAll(): JsonResponse
    {
        $company = auth()->user()->company;
        $requestedSongIds = $company->requestedSongs()
            ->whereDate('created_at', today())
            ->pluck('id');
        Upvote::whereIn('requested_song_id', $requestedSongIds)
            ->whereDate('created_at', today())
            ->delete();
        $company->requestedSongs()
            ->whereDate('created_at', today())
            ->delete();

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }

    private function getTrackInfo($spotifyId): array
    {
        return SongDTO::fromObjectToArray(
            $this->spotifyApi->getClient()->getTrack($spotifyId)
        );
    }
}
