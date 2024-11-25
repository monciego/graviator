<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('block_id')->constrained('blocks')->onDelete('cascade');
            $table->integer('lot_no');
            $table->string('type_of_lot');
            $table->float('latitude', 10, 6);
            $table->float('longitude', 10, 6);
            $table->enum('status', ['available', 'sold', 'occupied'])->default('available');
            $table->string('lot_owner')->nullable();
            $table->string('lot_owner_relationship_to_deceased')->nullable();
            $table->string('contact_no')->nullable();
            $table->string('email_address')->nullable();
            $table->timestamps();

            $table->unique(['block_id', 'lot_no']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lots');
    }
};
