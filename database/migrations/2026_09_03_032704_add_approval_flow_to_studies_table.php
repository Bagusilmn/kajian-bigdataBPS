<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('studies', function (Blueprint $table) {
            $table->enum('approval_flow', [
                'reviewer',
                'reviewer_director',
            ])->default('reviewer_director')->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('studies', function (Blueprint $table) {
            $table->dropColumn('approval_flow');
        });
    }
};