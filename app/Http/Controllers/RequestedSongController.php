<?php

namespace App\Http\Controllers;

use \Illuminate\Http\JsonResponse;
use App\Http\Resources\RequestedSongResource;
use App\Models\Company;
use App\Models\RequestedSong;
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

  public function search(Request $request)
  {
    // $results = app(SpotifyApi::class)->getClient()->search($request->query('q'), 'track');
    $results = $this->spotifyApi->getClient()->search($request->query('q'), 'track');

    return response()->json(RequestedSongController::searchResultsBuilder($results));
  }

  public static function searchResultsBuilder($results)
  {
    $i = 1;
    foreach ($results->tracks->items as $track) {
      $newResultsArray[] = [
        'id' => $i,
        'spotify_id' => $track->id,
        'song_data' => [
          'song_name' => $track->name,
          'artist_name' => $track->artists[0]->name,
          'album_cover_img' => $track->album->images[0]->url
        ]
      ];
      $i++;
    }

    return $newResultsArray;
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
