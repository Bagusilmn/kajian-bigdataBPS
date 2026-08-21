<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('study_media');
    }

    public function down(): void
    {
        // Tidak dikembalikan karena tabel ini merupakan tabel legacy.
    }
};