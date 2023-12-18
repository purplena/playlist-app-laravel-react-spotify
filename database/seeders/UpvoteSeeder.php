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
    $requestedSongs = RequestedSong::all();
    $users = User::where('role', 2)->get();

    foreach ($users as $user) {
      Upvote::create([
        'requested_song_id' => $requestedSongs->random()->id,
        'user_id' => $user->id,
      ]);
    }
  }
}
