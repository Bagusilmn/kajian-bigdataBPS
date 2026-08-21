<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('study_reviews', function (Blueprint $table) {
            $table->enum('stage', [
                'reviewer',
                'director',
            ])
                ->default('reviewer')
                ->after('decision');

            $table->index('stage');
        });
    }

    public function down(): void
    {
        Schema::table('study_reviews', function (Blueprint $table) {
            $table->dropIndex(['stage']);
            $table->dropColumn('stage');
        });
    }
};