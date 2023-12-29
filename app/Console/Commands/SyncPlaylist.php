<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Repositories\SongRepository;
use App\Services\SpotifyApi;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Throwable;

class SyncPlaylist extends Command
{

  public function __construct(protected SpotifyApi $spotifyApi, private SongRepository $songRepository)
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
      } catch (Throwable $t) {
        Log::error('Problem with refresh token. Reconnection to spotify is needed', ['company' => $company]);
        $company->update([
          'spotify_playlist_data' => null
        ]);
        continue;
      }

      try {
        if (collect($this->getAllPlaylists($api, $company))->contains('id', Arr::get($company->spotify_playlist_data, 'playlist.id'))) {
          $this->addTracksToPlaylist($api, $company);
        } else {
          $company->update([
            'spotify_playlist_data' => null
          ]);
        }
      } catch (Throwable $t) {
        Log::error('Problem with user_id in spotify_playlist_data. spotify_playlist_data is corrupted', ['company' => $company]);
        continue;
      }
    }
  }

  protected function addTracksToPlaylist($api, Company $company)
  {
    $songsToAddToSpotify = $this->getSongsToAddToSpotify($company);
    $playlistId = Arr::get($company->spotify_playlist_data, 'playlist.id');

    $songsToAddToSpotify->each(function ($songToAdd) use ($api, $playlistId, $company) {
      $api->addPlaylistTracks($playlistId, [
        $songToAdd->song->spotify_id
      ]);
      $company->songs()->attach($songToAdd->song_id);
    });
  }

  protected function getAllPlaylists($api, $company): array
  {
    $userId = Arr::get($company->spotify_playlist_data, 'user_id');

    $continue = true;
    $nbElementsSeen = 0;
    $items = [];
    $limitPerPage = 50;

    while ($continue) {
      $playlists = $api->getUserPlaylists($userId, [
        'limit' => $limitPerPage,
        'offset' => $nbElementsSeen
      ]);
      $items = array_merge($items, $playlists->items);
      $nbElementsSeen += $limitPerPage;
      if ($nbElementsSeen >=  $playlists->total) {
        $continue = false;
      }
    }

    return $items;
  }

  protected function getSongsToAddToSpotify($company)
  {
    $requestedSongs = $this->songRepository->getRequestedSongsWithUpvotesCount($company);
    $topScores = $this->getTopThreeScores($requestedSongs);
    $companySongsIds = $company->songs()->pluck('song_id')->toArray();

    return  $requestedSongs->filter(function ($requestedSong) use ($topScores) {
      return in_array($requestedSong->upvotes_count, $topScores);
    })
      ->filter(function ($requestedSong) use ($companySongsIds) {
        return !in_array($requestedSong->song_id, $companySongsIds);
      });
  }

  protected function getTopThreeScores($requestedSongs): array
  {
    return collect($requestedSongs->pluck('upvotes_count'))
      ->filter(fn ($value) => $value > 0)
      ->unique()
      ->values()
      ->sortDesc()
      ->slice(0, 3)
      ->toArray();
  }
}
