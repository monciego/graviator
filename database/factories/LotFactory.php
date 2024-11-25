<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lot>
 */
class LotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = \App\Models\Lot::class;
    public function definition(): array
    {
        return [
            'lot_no' => $this->faker->unique()->numerify('Lot ###'),
            'type_of_lot' => $this->faker->randomElement(['Single', 'Double', 'Family']),
            'status' => $this->faker->randomElement(['Available', 'Occupied']),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'lot_owner' => $this->faker->name(),
            'lot_owner_relationship_to_deceased' => $this->faker->randomElement(['Spouse', 'Parent', 'Sibling']),
            'contact_no' => $this->faker->phoneNumber(),
            'email_address' => $this->faker->safeEmail(),
            'block_id' => null, // Will be filled in the seeder
        ];
    }
}
