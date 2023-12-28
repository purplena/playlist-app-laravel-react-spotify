<?php

namespace App\Console\Commands;

use App\Http\Resources\RequestedSongResource;
use App\Models\Company;
use App\Services\SpotifyApi;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Throwable;

class SyncPlaylist extends Command
{

  public function __construct(protected SpotifyApi $spotifyApi)
  {
    parent::__construct();
  }
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:sync-playlist';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Command description';

  /**
   * Execute the console command.
   */
  public function handle()
  {
    foreach (Company::all() as $company) {
      try {
        $api = $this->spotifyApi->getCompanyApiInstance($company);
        try {
          $userId = Arr::get($company->spotify_playlist_data, 'user_id');
          $playlists = $api->getUserPlaylists($userId, [
            'limit' => 10
          ]);
          if (!collect($playlists->items)->contains('id', Arr::get($company->spotify_playlist_data, 'playlist.id'))) {
            $company->update([
              'spotify_playlist_data' => null
            ]);
          } else {
            $this->addTracksToPlaylist($company);
          }
        } catch (Throwable $t) {
          //problem with user_id in spotify_playlist_data
          // spotify_playlist_data is corrupted
          continue;
        }
      } catch (Throwable $t) {
        // problem with refresh token
        // spotify_playlist_data is corrupted
        // make an action here
        //for example send an email that a "reconnection to spotify is needed"
        Log::error('Problem with refresh token', ['company' => $company]);
        $company->update([
          'spotify_playlist_data' => null
        ]);
        continue;
      }
    }
  }

  protected function addTracksToPlaylist(Company $company)
  {

    $requestedSongs = $company->requestedSongs()->with('song', 'upvotes')
      ->withCount('upvotes')
      ->whereDate('created_at', today())
      ->orderBy('upvotes_count', 'desc')
      ->get();

    $topScores = $this->getTopThreeScores($requestedSongs);
    $companySongs = $company->songs();
    $existingSongIds = $companySongs->pluck('song_id')->toArray();

    foreach ($requestedSongs as $requestedSong) {
      if (in_array($requestedSong->upvotes_count, $topScores)) {
        if (!in_array($requestedSong->song_id, $existingSongIds)) {
          $songsToAddToSpotify[] = $requestedSong;
        }
      }
    }

    $api = $this->spotifyApi->getCompanyApiInstance($company);
    $playlistId = Arr::get($company->spotify_playlist_data, 'playlist.id');
    foreach ($songsToAddToSpotify as $songToAddToSpotify) {
      $api->addPlaylistTracks($playlistId, [
        $songToAddToSpotify->song->spotify_id
      ]);
      $companySongs->attach($songToAddToSpotify->song_id);
    }
  }

  protected function getTopThreeScores($requestedSongs): array
  {
    foreach ($requestedSongs as $requestedSong) {
      $topScores[] = $requestedSong->upvotes_count;
    };
    $uniqueValues = array_keys(array_flip($topScores));
    rsort($uniqueValues);

    return array_slice($uniqueValues, 0, 3);
  }
}
