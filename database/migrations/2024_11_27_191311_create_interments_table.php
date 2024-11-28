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
        Schema::create('interments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('deceased_information_id')->constrained('deceased_information')->onDelete('cascade');
            $table->string('type'); // Type of service
            $table->string('category'); // Type of service
            $table->integer('amount'); // Amount for the service
            $table->date('date'); // Service date
            $table->string('time'); // Service time (e.g., "8-9")
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interments');
    }
};
