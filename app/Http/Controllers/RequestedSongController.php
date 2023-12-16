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
  public function store(Company $company, Request $request)
  {
    $requestedSong = $this->getTrackInfo($request->spotifyId);

    $song = Song::updateOrCreate([
      'spotify_id' => $requestedSong['spotify_id']
    ], $requestedSong);

    $requestedSongExists = RequestedSong::where('song_id', $song->id)->whereDate('created_at', today())->exists();

    if ($requestedSongExists) {
      return response()->json(['message' => 'Cette chanson a été déjà suggérée!']);
    } else {
      RequestedSong::create([
        'song_id' => $song->id,
        'user_id' => auth()->id(),
        'company_id' => $company->id
      ]);

      return response()->json(['message' => 'Bravo! Vous avez suggéré une chanson!']);
    }
  }

  public function getTrackInfo($spotifyId)
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
