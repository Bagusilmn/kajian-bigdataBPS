<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_comments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('study_id')
                ->constrained('studies')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->text('comment');

            $table->enum('status', [
                'pending',
                'approved',
                'hidden',
            ])->default('pending');

            $table->timestamps();

            $table->index([
                'study_id',
                'status',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_comments');
    }
};