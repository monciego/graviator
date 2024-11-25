<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DeceasedInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

// Fetch all lot IDs where the status is 'occupied'
$occupiedLotIds = DB::table('lots')
    ->where('status', 'occupied') // Filter by status
    ->pluck('id');

foreach ($occupiedLotIds as $lotId) {
    foreach (range(1, $faker->numberBetween(1, 3)) as $index) { // Add 1-3 deceased per lot
        DB::table('deceased_information')->insert([
            'lot_id' => $lotId,
            'deceased_name' => $faker->name,
            'date_of_birth' => $faker->date('Y-m-d', '-80 years'),
            'date_of_death' => $faker->date('Y-m-d', 'now'),
            'gender' => $faker->randomElement(['male', 'female']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
    }
}
