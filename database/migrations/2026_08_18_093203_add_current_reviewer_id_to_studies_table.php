<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('studies', function (Blueprint $table) {
            $table->foreignId('current_reviewer_id')
                ->nullable()
                ->after('author_id')
                ->constrained('users')
                ->nullOnDelete();

            $table->index('current_reviewer_id');
        });
    }

    public function down(): void
    {
        Schema::table('studies', function (Blueprint $table) {
            $table->dropForeign(['current_reviewer_id']);
            $table->dropIndex(['current_reviewer_id']);
            $table->dropColumn('current_reviewer_id');
        });
    }
};