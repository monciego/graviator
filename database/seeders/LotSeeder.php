<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class LotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $positions = [
            ['latitude' => 16.148512629435054, 'longitude' => 119.98425076130748],
            ['latitude' => 16.147893300068628, 'longitude' => 119.98429395726149],
            ['latitude' => 16.148252444410037, 'longitude' => 119.98407740945444],
            // ... (add the rest of your positions here) ...
            ['latitude' => 16.148433613354417, 'longitude' => 119.98436231333112],
        ];

        foreach ($positions as $key => $position) {
            DB::table('lots')->insert([
                'block_id' => $faker->numberBetween(1, 10),
                'lot_no' => $key + 1,
                'type_of_lot' => $faker->randomElement(['single', 'double', 'family']),
                'latitude' => $position['latitude'],
                'longitude' => $position['longitude'],
                'status' => $faker->randomElement(['available', 'sold', 'occupied']),
                'lot_owner' => $faker->name,
                'lot_owner_relationship_to_deceased' => $faker->randomElement(['parent', 'child', 'spouse', 'friend']),
                'contact_no' => $faker->phoneNumber,
                'email_address' => $faker->safeEmail,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
