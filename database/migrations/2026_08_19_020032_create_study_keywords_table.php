<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_keywords', function (Blueprint $table) {
            $table->id();

            $table->foreignId('study_id')
                ->constrained('studies')
                ->cascadeOnDelete();

            $table->foreignId('keyword_id')
                ->constrained('keywords')
                ->cascadeOnDelete();

            $table->timestamps();

            $table->unique([
                'study_id',
                'keyword_id',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_keywords');
    }
};