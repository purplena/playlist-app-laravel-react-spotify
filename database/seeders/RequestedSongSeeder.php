<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Seeder;

class RequestedSongSeeder extends Seeder
{
  public function run(): void
  {
    for ($i = 0; $i < 15; $i++) {
      RequestedSong::create([
        'song_id' => Song::all()->take(5)->random()->id,
        'user_id' => User::where('role', 2)->get()->random()->id,
        'company_id' => Company::all()->random()->id
      ]);
    }
  }
}
