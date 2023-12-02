<?php

namespace Database\Seeders;

use Database\Seeders\CompanySeeder;
use Database\Seeders\CompanySongBlacklistedSeeder;
use Database\Seeders\CompanySongSeeder;
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
      CompanySongBlacklistedSeeder::class,
      CompanySongSeeder::class,
      RequestedSongSeeder::class,
      UpvoteSeeder::class
    ]);
  }
}
