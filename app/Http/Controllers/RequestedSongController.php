<?php

namespace App\Http\Controllers;

use \Illuminate\Http\JsonResponse;
use App\Http\DTO\SongDTO;
use App\Http\Resources\RequestedSongResource;
use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\Upvote;
use App\Services\SpotifyApi;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class RequestedSongController extends Controller
{
  public function __construct(protected SpotifyApi $spotifyApi)
  {
  }

  /**
   * Display a listing of the resource.
   */
  public function index(Company $company): JsonResource
  {
    $requestedSongs = $company->requestedSongs()->with('song', 'upvotes')
      ->withCount('upvotes')
      ->whereDate('created_at', today())
      ->orderBy('upvotes_count', 'desc')
      ->get();

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

  public function upvote(Company $company, RequestedSong $requestedSong)
  {
    $userUpvote = $requestedSong->upvotes()->where('user_id', auth()->id())->first();

    if ($userUpvote) {
      $userUpvote->delete();
    } else {
      Upvote::create([
        'requested_song_id' => $requestedSong->id,
        'user_id' => auth()->id(),
      ]);
    }

    return response()->json(['success' => true]);
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
          'message' => 'Nous ne pouvons pas supprimer cette chanson. Il y a déjà des "likes"',
          'error' => 'forbidden',
        ], Response::HTTP_BAD_REQUEST);
      }
      $requestedSong->delete();
      $requestedSong->song()->delete();

      return response()->json(['message' => 'Cette chanson a été supprimée!', 'status' => 'deleted']);
    } else {
      $song = Song::where(['spotify_id' => $request->spotifyId])
        ->firstOr(function () use ($request) {
          return Song::create($this->getTrackInfo($request->spotifyId));
        });
      RequestedSong::create([
        'song_id' => $song->id,
        'user_id' => auth()->id(),
        'company_id' => $company->id
      ]);

      return response()->json(['message' => 'Bravo! Vous avez suggéré une chanson!', 'status' => 'added'], 201);
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
  public function destroy(RequestedSong $requestedSong)
  {
    //
  }
}
