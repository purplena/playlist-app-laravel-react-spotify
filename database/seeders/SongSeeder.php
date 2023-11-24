<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $songs = [
      [
        'spotify_id' => '7gCeodIXjhCLDWC5H1LOmT',
        'song_data' => [
          'song_name' => 'Your Song',
          'artist_name' => 'Elton John',
          'album_cover_img' => 'https://i.scdn.co/image/ab67616d00001e022cdf51f55c1cbc31a20c46dc'
        ],
      ],
      [
        'spotify_id' => '7iN1s7xHE4ifF5povM6A48',
        'song_data' => [
          'song_name' => 'Let It Be',
          'artist_name' => 'The Beatles',
          'album_cover_img' => 'https://i.scdn.co/image/ab67616d00001e0284243a01af3c77b56fe01ab1'
        ],
      ],
      [
        'spotify_id' => '3AszgPDZd9q0DpDFt4HFBy',
        'song_data' => [
          'song_name' => 'The Way You Move / Hey Ya!',
          'artist_name' => 'Outkast',
          'album_cover_img' => 'https://i.scdn.co/image/ab67616d00001e0244d34793d0f4bddf28e0e8a8'
        ],
      ],
      [
        'spotify_id' => '5WZDLZVCvY1rEyNir6k8Pg',
        'song_data' => [
          'song_name' => 'The Show Must Go On',
          'artist_name' => 'Queen',
          'album_cover_img' => 'https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b'
        ],
      ],
      [
        'spotify_id' => '10nyNJ6zNy2YVYLrcwLccB',
        'song_data' => [
          'song_name' => 'No Surprises',
          'artist_name' => 'Radiohead',
          'album_cover_img' => 'https://i.scdn.co/image/ab67616d00001e02c8b444df094279e70d0ed856'
        ],
      ],
      [
        'spotify_id' => 'blacklisted_song_id',
        'song_data' => [
          'song_name' => 'blacklisted_song_name',
          'artist_name' => 'blacklisted_song_artist',
          'album_cover_img' => 'blacklisted_song_album_photo_url'
        ],
      ],
      [
        'spotify_id' => 'blacklisted_song_id_2',
        'song_data' => [
          'song_name' => 'blacklisted_song_name_2',
          'artist_name' => 'blacklisted_song_artist_2',
          'album_cover_img' => 'blacklisted_song_album_photo_url_2'
        ],
      ],
    ];

    foreach ($songs as $song) {
      Song::create($song);
    }
  }
}
