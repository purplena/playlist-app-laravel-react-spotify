<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Song;
use Illuminate\Database\Seeder;

class CompanySongBlacklistedSeeder extends Seeder
{
    public function run(): void
    {
        $blacklistedSongs = Song::limit(5)->get();
        $companies = Company::all();

        foreach ($blacklistedSongs as $blacklistedSong) {
            $randomCompany = $companies->random();
            $randomCompany->blacklistedSongs()->attach($blacklistedSong->id);
        }
    }
}
