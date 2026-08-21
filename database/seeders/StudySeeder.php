<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Study;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StudySeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where(
            'email',
            'admin@bigdata.bps.go.id'
        )->firstOrFail();

        $studies = [
            [
                'category' => 'web-scraping',
                'title' => 'Pemanfaatan Web Scraping untuk Mendukung Statistik Resmi',
                'excerpt' => 'Eksplorasi pemanfaatan web scraping sebagai sumber data alternatif untuk mendukung penyediaan statistik resmi.',
                'content' => 'Kajian ini membahas pemanfaatan teknik web scraping untuk memperoleh data dari sumber terbuka di internet dan mengeksplorasi potensinya sebagai sumber data alternatif.',
            ],

            [
                'category' => 'social-media',
                'title' => 'Pemanfaatan Data Media Sosial untuk Analisis Fenomena Sosial',
                'excerpt' => 'Eksplorasi data media sosial sebagai sumber informasi untuk memahami fenomena sosial yang berkembang.',
                'content' => 'Kajian ini mengeksplorasi pemanfaatan data media sosial sebagai sumber data alternatif untuk memperoleh informasi mengenai berbagai fenomena sosial.',
            ],

            [
                'category' => 'data-science',
                'title' => 'Machine Learning dalam Pengolahan Big Data',
                'excerpt' => 'Kajian mengenai pemanfaatan machine learning dalam proses analisis data berskala besar.',
                'content' => 'Kajian ini membahas penerapan machine learning untuk membantu proses eksplorasi, pengolahan, dan analisis Big Data.',
            ],

            [
                'category' => 'geospatial',
                'title' => 'Pemanfaatan Data Geospasial dalam Statistik',
                'excerpt' => 'Eksplorasi data geospasial untuk mendukung analisis statistik berbasis wilayah.',
                'content' => 'Kajian ini membahas pemanfaatan data geospasial dalam mendukung analisis statistik dan penyajian informasi berbasis wilayah.',
            ],
        ];

        foreach ($studies as $item) {

            $category = Category::where(
                'slug',
                $item['category']
            )->firstOrFail();

            Study::updateOrCreate(
                [
                    'slug' => Str::slug($item['title']),
                ],
                [
                    'author_id' => $user->id,
                    'category_id' => $category->id,
                    'title' => $item['title'],
                    'excerpt' => $item['excerpt'],
                    'content' => $item['content'],
                    'status' => 'published',
                    'published_at' => now(),
                ]
            );
        }
    }
}