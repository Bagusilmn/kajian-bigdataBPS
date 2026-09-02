<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password');

        User::create([
            'name' => 'Admin Big Data BPS',
            'email' => 'admin@bigdata.bps.go.id',
            'password' => $password,
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Direktur Big Data BPS',
            'email' => 'direktur@bigdata.bps.go.id',
            'password' => $password,
            'role' => 'director',
        ]);

        User::create([
            'name' => 'Reviewer Big Data',
            'email' => 'reviewer@bigdata.bps.go.id',
            'password' => $password,
            'role' => 'reviewer',
        ]);

        User::create([
            'name' => 'Bagus Ilman Huda',
            'email' => 'peneliti@bigdata.bps.go.id',
            'password' => $password,
            'role' => 'user',
        ]);
    }
}