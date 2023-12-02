<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Song>
 */
class SongFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'spotify_id' => fake()->uuid(),
      'song_data' => [
        'song_name' => fake()->sentence(3),
        'artist_name' => ucfirst(fake()->word()),
        'album_cover_img' => fake()->url()
      ]
    ];
  }
}
