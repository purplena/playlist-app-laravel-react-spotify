<?php

namespace Database\Seeders;

use App\Models\RequestedSong;
use App\Models\Upvote;
use App\Models\User;
use Illuminate\Database\Seeder;

class UpvoteSeeder extends Seeder
{
  public function run(): void
  {
    for ($i = 0; $i < 20; $i++) {
      Upvote::create([
        'requested_song_id' => RequestedSong::all()->random()->id,
        'user_id' => User::where('role', 2)->get()->random()->id,
      ]);
    }
  }
}
