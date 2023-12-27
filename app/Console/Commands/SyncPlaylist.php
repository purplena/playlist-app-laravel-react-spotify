<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncPlaylist extends Command
{
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
    dd("ok");
    // $api = $this->spotifyApi->getCompanyApiInstance($company);
    // $userId = "89l0ygza24p05l6nz4n1bj1ut";

    // $playlists = $api->getUserPlaylists($userId, [
    //   'limit' => 5
    // ]);

    // dd($playlists);
    // dd(Arr::get($company->spotify_playlist_data, 'playlist.id'));
    // dd($api->getPlaylist(Arr::get($company->spotify_playlist_data, 'playlist.id')));
    // dd($api->getPlaylist("2BFhGYOAsjkitd34cD2a00"));
    // dd($api->getPlaylist("1S7g8GqdHEzrsZjdd4oAaN"));
  }
}
