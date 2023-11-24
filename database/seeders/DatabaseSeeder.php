<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Song;
use Database\Seeders\CompanySeeder;
use Database\Seeders\RequestedSongSeeder;
use Database\Seeders\SongSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  public function run(): void
  {
    $this->call([
      SongSeeder::class,
      CompanySeeder::class,
      UserSeeder::class,
    ]);

    $this->seedRandomSongsByCompany();
    $this->seedBlacklistedSongs();

    $this->call([
      RequestedSongSeeder::class,
      UpvoteSeeder::class
    ]);
  }

  protected function seedRandomSongsByCompany()
  {
    $songs = Song::all()->take(5);
    $companies = Company::all();
    foreach ($songs as $song) {
      $randomCompany = $companies->random();
      $randomCompany->songs()->attach($song->id);
    }
  }

  protected function seedBlacklistedSongs()
  {
    $blacklistedSongs = collect(Song::all())->slice(4, 2);
    $companies = Company::all();
    foreach ($companies as $company) {
      foreach ($blacklistedSongs as $blacklistedSong) {
        $company->blacklistedSongs()->attach($blacklistedSong->id);
      }
    }
  }
}
