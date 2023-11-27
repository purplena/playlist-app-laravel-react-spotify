<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'name' => fake()->name,
      'slug' => fake()->slug(2),
      'tel' => fake()->phoneNumber(),
      'zip' => fake()->postcode(),
      'country' => fake()->country(),
      'city' => fake()->city(),
      'address' => fake()->address(),
      'spotify_playlist_data' => [
        'id' => fake()->bothify('?????-#####'),
        'snapshot_id' => fake()->uuid()
      ],
      'qr_code' => fake()->image(null, 360, 360, 'animals', true),
      'logo' => fake()->image(null, 360, 360, 'animals', true)
    ];
  }
}
