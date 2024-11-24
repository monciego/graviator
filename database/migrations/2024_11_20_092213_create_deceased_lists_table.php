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
        Schema::create('deceased_lists', function (Blueprint $table) {
            $table->id();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('status'); // available, sold, or occupied
            /* personal information */
            $table->string("deceased_name");
            $table->string("deceased_date_of_birth");
            $table->string("deceased_date_of_death");
            $table->string("deceased_gender");
            /* location */
            $table->string("type_of_lot");
            $table->string("block_no");
            $table->string("lot_no");
            /* lot owner */
            $table->string("owner_name");
            $table->string("relationship_to_deceased");
            $table->string("contact_no");
            $table->string("email_address");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deceased_lists');
    }
};
