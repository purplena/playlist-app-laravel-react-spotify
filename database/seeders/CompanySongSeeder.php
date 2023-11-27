<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySongSeeder extends Seeder
{
  public function run(): void
  {
    $songs = DB::table('songs')
      ->select('songs.*')
      ->leftJoin('company_song_blacklisted', 'company_song_blacklisted.song_id', '=', 'songs.id')
      ->whereNull('company_song_blacklisted.song_id')
      ->get();
    $companies = Company::all();

    foreach ($songs as $song) {
      $randomCompany = $companies->random();
      $randomCompany->songs()->attach($song->id);
    }
  }
}
