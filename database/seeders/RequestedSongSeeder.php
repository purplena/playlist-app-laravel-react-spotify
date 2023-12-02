<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequestedSongSeeder extends Seeder
{
  public function run(): void
  {
    $songs = Song::query()
      ->select('songs.*')
      ->leftJoin('company_song_blacklisted', 'company_song_blacklisted.song_id', '=', 'songs.id')
      ->whereNull('company_song_blacklisted.song_id')
      ->get();
    $users = User::where('role', 2)->get();
    $companies = Company::all();

    for ($i = 0; $i < 30; $i++) {
      RequestedSong::create([
        'song_id' => $songs->random()->id,
        'user_id' => $users->random()->id,
        'company_id' => $companies->random()->id
      ]);
    }
  }
}
