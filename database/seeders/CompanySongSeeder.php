<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Repositories\SongRepository;
use Illuminate\Database\Seeder;

class CompanySongSeeder extends Seeder
{
    public function __construct(private SongRepository $songRepository) {}

    public function run(): void
    {
        $songs = $this->songRepository->getNotBlacklistedSongs();
        $companies = Company::all();

        foreach ($songs as $song) {
            $randomCompany = $companies->random();
            $randomCompany->songs()->attach($song->id);
        }
    }
}
