<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

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
                'snapshot_id' => fake()->uuid(),
            ],
            'logo' =>function () {
                $sourcePath = public_path('images/seeders/fake-logo.png');
                $fileName = 'fake-logo.png';
                Storage::disk('public')->put($fileName, file_get_contents($sourcePath));

                return $fileName;
            },
        ];
    }
}
