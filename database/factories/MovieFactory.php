<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
          return [
            'title'        => $this->faker->movie(3), // contoh: "The Dark Knight"
            'description'  => $this->faker->paragraph(3),
            'duration'     => $this->faker->numberBetween(60, 180), // durasi film (menit)
            'genre'        => $this->faker->randomElement(['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror']),
            'director'     => $this->faker->name(),
            'release_date' => $this->faker->date(), // YYYY-MM-DD
            'poster_url'   => $this->faker->imageUrl(400, 600, 'movies', true, 'Poster'), 
            'trailer_url'  => 'https://www.youtube.com/watch?v=' . $this->faker->regexify('[A-Za-z0-9_-]{11}'),
            'rating'       => $this->faker->randomFloat(1, 0, 5), // angka desimal 0.0 - 5.0
            'is_active'    => $this->faker->boolean(), // true / false
        ];
    }
}
