<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\RequestedSong;
use App\Models\User;
use App\Repositories\SongRepository;
use Illuminate\Database\Seeder;

class RequestedSongSeeder extends Seeder
{
    public function __construct(private SongRepository $songRepository) {}

    public function run(): void
    {
        $songs = $this->songRepository->getNotBlacklistedSongs();
        $users = User::where('role', 2)->get();
        $companies = Company::all();

        foreach ($songs as $song) {
            RequestedSong::create([
                'song_id' => $song->id,
                'user_id' => $users->random()->id,
                'company_id' => $companies->random()->id,
            ]);
        }
    }
}
