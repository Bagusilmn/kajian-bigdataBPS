<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('studies', function (Blueprint $table) {
            $table->enum('status', [
                'draft',
                'submitted',
                'under_review',
                'revision',
                'director_review',
                'rejected',
                'published',
            ])->default('draft')->change();
        });
    }

    public function down(): void
    {
        Schema::table('studies', function (Blueprint $table) {
            $table->enum('status', [
                'draft',
                'submitted',
                'under_review',
                'revision',
                'approved',
                'published',
                'rejected',
            ])->default('draft')->change();
        });
    }
};