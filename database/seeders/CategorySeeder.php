<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create([
            'name' => 'Web Scraping',
            'slug' => 'web-scraping',
            'description' => 'Pemanfaatan data dari sumber web.',
        ]);

        Category::create([
            'name' => 'Social Media',
            'slug' => 'social-media',
            'description' => 'Analisis dan pemanfaatan data media sosial.',
        ]);

        Category::create([
            'name' => 'Data Science',
            'slug' => 'data-science',
            'description' => 'Analisis menggunakan metode data science.',
        ]);

        Category::create([
            'name' => 'Geospatial',
            'slug' => 'geospatial',
            'description' => 'Analisis data berbasis wilayah.',
        ]);

        Category::create([
            'name' => 'Big Data',
            'slug' => 'big-data',
            'description' => 'Eksplorasi dan pemanfaatan Big Data.',
        ]);
    }
}