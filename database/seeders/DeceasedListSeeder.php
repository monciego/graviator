<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class DeceasedListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $positions = [
                ['id' => 2, 'latitude' => 16.148512629435054, 'longitude' => 119.98425076130748],
                ['id' => 3, 'latitude' => 16.147893300068628, 'longitude' => 119.98429395726149],
                ['id' => 5, 'latitude' => 16.148252444410037, 'longitude' => 119.98407740945444],
                ['id' => 7, 'latitude' => 16.14888576018499, 'longitude' => 119.98425207116803],
                ['id' => 8, 'latitude' => 16.148111764688018, 'longitude' => 119.9843089651407],
                ['id' => 9, 'latitude' => 16.148434722054752, 'longitude' => 119.98407034017401],
                ['id' => 10, 'latitude' => 16.14880019907022, 'longitude' => 119.98433353270416],
                ['id' => 12, 'latitude' => 16.149172752358332, 'longitude' => 119.98434178858378],
                ['id' => 13, 'latitude' => 16.147898916500022, 'longitude' => 119.98388229319083],
                ['id' => 15, 'latitude' => 16.149113922362208, 'longitude' => 119.98450148501048],
                ['id' => 16, 'latitude' => 16.149127605785225, 'longitude' => 119.98419626138848],
                ['id' => 19, 'latitude' => 16.14908970478055, 'longitude' => 119.98410893411314],
                ['id' => 22, 'latitude' => 16.148429372116695, 'longitude' => 119.9840571162079],
                ['id' => 23, 'latitude' => 16.149428198207687, 'longitude' => 119.9843215705927],
                ['id' => 24, 'latitude' => 16.14924347554259, 'longitude' => 119.98442462365043],
                ['id' => 27, 'latitude' => 16.14950066921022, 'longitude' => 119.98434638789239],
                ['id' => 28, 'latitude' => 16.14813506212197, 'longitude' => 119.98443375914529],
                ['id' => 30, 'latitude' => 16.14932046506843, 'longitude' => 119.98434234129833],
                ['id' => 31, 'latitude' => 16.147922872513696, 'longitude' => 119.98409716824067],
                ['id' => 32, 'latitude' => 16.14871138318099, 'longitude' => 119.9844639005804],
                ['id' => 33, 'latitude' => 16.149172908105612, 'longitude' => 119.9845403597034],
                ['id' => 34, 'latitude' => 16.148362915817323, 'longitude' => 119.9842416136464],
                ['id' => 35, 'latitude' => 16.148180732240956, 'longitude' => 119.98394704077103],
                ['id' => 36, 'latitude' => 16.149155941930875, 'longitude' => 119.98456699232814],
                ['id' => 38, 'latitude' => 16.148694176466098, 'longitude' => 119.98445397711446],
                ['id' => 39, 'latitude' => 16.148222944814428, 'longitude' => 119.9844335808877],
                ['id' => 42, 'latitude' => 16.14798739179442, 'longitude' => 119.98413850985195],
                ['id' => 43, 'latitude' => 16.148770442643325, 'longitude' => 119.9845151889884],
                ['id' => 44, 'latitude' => 16.148542519261387, 'longitude' => 119.9845677456205],
                ['id' => 45, 'latitude' => 16.14827271128615, 'longitude' => 119.98395521027426],
                ['id' => 46, 'latitude' => 16.148047489007364, 'longitude' => 119.98405315227677],
                ['id' => 47, 'latitude' => 16.149253854642556, 'longitude' => 119.9842553171412],
                ['id' => 48, 'latitude' => 16.148619272437063, 'longitude' => 119.98419532086926],
                ['id' => 49, 'latitude' => 16.149096072250387, 'longitude' => 119.98445524309078],
                ['id' => 50, 'latitude' => 16.14924610764557, 'longitude' => 119.9845909540715],
                ['id' => 51, 'latitude' => 16.149331799787358, 'longitude' => 119.98425327128702],
                ['id' => 52, 'latitude' => 16.14868119878811, 'longitude' => 119.98421321612739],
                ['id' => 53, 'latitude' => 16.14788517844977, 'longitude' => 119.98408601151759],
                ['id' => 54, 'latitude' => 16.14913947588509, 'longitude' => 119.98431439728704],
                ['id' => 55, 'latitude' => 16.14888399874948, 'longitude' => 119.98454206045703],
                ['id' => 56, 'latitude' => 16.148029358900963, 'longitude' => 119.98397588228475],
                ['id' => 57, 'latitude' => 16.148384410944125, 'longitude' => 119.98443370094859],
                ['id' => 58, 'latitude' => 16.147964615425277, 'longitude' => 119.98374138895726],
                ['id' => 60, 'latitude' => 16.148433613354417, 'longitude' => 119.98436231333112],
            ];

        foreach ($positions as $position) {
            DB::table('deceased_lists')->insert([
                'latitude' => $position['latitude'],
                'longitude' => $position['longitude'],
                'status' => $faker->randomElement(['available', 'sold', 'occupied']),
                'deceased_name' => $faker->name,
                'deceased_date_of_birth' => $faker->date(),
                'deceased_date_of_death' => $faker->date(),
                'deceased_gender' => $faker->randomElement(['male', 'female']),
                'type_of_lot' => $faker->randomElement(['single', 'double', 'family']),
                'block_no' => $faker->randomDigitNotNull,
                'lot_no' => $faker->randomDigitNotNull,
                'owner_name' => $faker->name,
                'relationship_to_deceased' => $faker->randomElement(['parent', 'child', 'spouse', 'friend']),
                'contact_no' => $faker->phoneNumber,
                'email_address' => $faker->safeEmail,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
