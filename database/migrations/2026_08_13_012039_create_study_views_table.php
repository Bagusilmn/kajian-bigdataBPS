<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_views', function (Blueprint $table) {
            $table->id();

            $table->foreignId('study_id')
                ->constrained('studies')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('session_id')->nullable();

            $table->timestamps();

            $table->index(['study_id', 'created_at']);
            $table->index(['study_id', 'session_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_views');
    }
};