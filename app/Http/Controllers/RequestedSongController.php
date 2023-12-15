<?php

namespace App\Http\Controllers;

use App\Http\DTO\SongDTO;
use \Illuminate\Http\JsonResponse;
use App\Http\Resources\RequestedSongResource;
use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\User;
use App\Services\SpotifyApi;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


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

  public function search(Request $request): JsonResponse
  {
    // $results = app(SpotifyApi::class)->getClient()->search($request->query('q'), 'track');
    $results = $this->spotifyApi->getClient()->search($request->query('q'), 'track');

    return response()->json(
      collect($results->tracks->items)->map(function ($track) {
        return SongDTO::fromObjectToArray($track);
      })->toArray()
    );
  }

  public function addToFavorites(Request $request)
  {
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(RequestedSong $requestedSong)
  {
    return RequestedSongResource::collection($requestedSong);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, RequestedSong $requestedSong)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(RequestedSong $requestedSong)
  {
    //
  }
}
