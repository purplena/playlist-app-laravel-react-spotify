<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
        $name = fake()->name;
        $slug = Str::slug($name);

        return [
            'name' => $name,
            'slug' => $slug,
            'tel' => fake()->phoneNumber(),
            'zip' => fake()->postcode(),
            'country' => fake()->country(),
            'city' => fake()->city(),
            'address' => fake()->address(),
            'spotify_playlist_data' => [
                'id' => fake()->bothify('?????-#####'),
                'snapshot_id' => fake()->uuid(),
            ],
            'logo' => 'logo/fake-logo.png',
            'qr_code' => 'qr/fake-qr.png',
        ];
    }
}
