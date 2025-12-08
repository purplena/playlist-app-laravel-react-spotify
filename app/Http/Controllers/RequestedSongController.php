<?php

namespace App\Http\Controllers;

use App\Http\DTO\SongDTO;
use App\Http\Requests\UpvoteRequest;
use App\Http\Resources\RequestedSongResource;
use App\Models\Company;
use App\Models\RequestedSong;
use App\Repositories\SongRepository;
use App\Services\RequestedSongService;
use App\Services\SpotifyApi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use App\Http\Requests\StoreRequestedSongRequest;

class RequestedSongController extends Controller
{
    public function __construct(
        protected SpotifyApi $spotifyApi,
        private SongRepository $songRepository,
        private RequestedSongService $requestedSongService
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

    public function upvote(UpvoteRequest $request, Company $company, RequestedSong $requestedSong): JsonResponse
    {
        $hasUpvoted = $this->requestedSongService->upvote($requestedSong);
        $message = $hasUpvoted ? 'Merci pour votre like' : 'Vous avez supprimé votre like';

        return response()->json(['message' => $message], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequestedSongRequest $request, Company $company): RequestedSongResource
    {
        $requestedSong = $this->requestedSongService->store($company, $request->spotifyId);

        return new RequestedSongResource($requestedSong);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RequestedSong $requestedSong): JsonResponse
    {
        $this->requestedSongService->deleteRequestedSong($requestedSong);

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }

    public function destroyAll(): JsonResponse
    {
        $company = auth()->user()->company;
        $this->requestedSongService->deleteAllRequestedSongs($company);

        return response()->json(['status' => 'ok'], Response::HTTP_OK);
    }
}
