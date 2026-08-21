<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Study;
use App\Models\StudyComment;
use App\Models\StudyDeletionRequest;
use App\Models\StudyLike;
use App\Models\StudyReview;
use App\Models\StudyShare;
use App\Models\StudyView;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DummyDataSeeder extends Seeder
{
    public function run(): void
    {
        $faker = fake('id_ID');
        $password = Hash::make('password');

        /*
        |--------------------------------------------------------------------------
        | USERS
        |--------------------------------------------------------------------------
        */

        // 1 ADMIN
        $admin = User::create([
            'name' => 'Admin Big Data BPS',
            'email' => 'admin@bigdata.bps.go.id',
            'password' => $password,
            'role' => 'admin',
        ]);

        // 1 DIRECTOR
        $director = User::create([
            'name' => 'Direktur Big Data BPS',
            'email' => 'direktur@bigdata.bps.go.id',
            'password' => $password,
            'role' => 'director',
        ]);

        // 5 REVIEWERS
        $reviewers = collect();

        $reviewers->push(
            User::create([
                'name' => 'Reviewer Big Data',
                'email' => 'reviewer@bigdata.bps.go.id',
                'password' => $password,
                'role' => 'reviewer',
            ])
        );

        foreach (range(1, 4) as $i) {
            $reviewers->push(
                User::create([
                    'name' => "Reviewer Dummy {$i}",
                    'email' => "reviewer{$i}.dummy@bigdata.bps.go.id",
                    'password' => $password,
                    'role' => 'reviewer',
                ])
            );
        }

        // 12 PENELITI
        $researchers = collect();

        for ($i = 1; $i <= 12; $i++) {
            $researchers->push(
                User::create([
                    'name' => $i === 1
                        ? 'Bagus Ilman Huda'
                        : $faker->name(),
                    'email' => $i === 1
                        ? 'peneliti@bigdata.bps.go.id'
                        : "peneliti{$i}.dummy@bigdata.bps.go.id",
                    'password' => $password,
                    'role' => 'user',
                ])
            );
        }

        /*
        |--------------------------------------------------------------------------
        | CATEGORIES
        |--------------------------------------------------------------------------
        */

        $categoryData = [
            [
                'name' => 'Big Data',
                'description' => 'Kajian mengenai pemanfaatan Big Data untuk statistik resmi.',
            ],
            [
                'name' => 'Web Scraping',
                'description' => 'Pemanfaatan data web dan teknik web scraping.',
            ],
            [
                'name' => 'Text Mining',
                'description' => 'Analisis teks, dokumen, dan percakapan digital.',
            ],
            [
                'name' => 'Computer Vision',
                'description' => 'Pemanfaatan citra dan video sebagai sumber data alternatif.',
            ],
            [
                'name' => 'Data Analytics',
                'description' => 'Analisis dan eksplorasi data untuk statistik.',
            ],
            [
                'name' => 'Social Media Analytics',
                'description' => 'Pemanfaatan data media sosial untuk analisis sosial dan ekonomi.',
            ],
            [
                'name' => 'Geospatial',
                'description' => 'Pemanfaatan data spasial, peta, dan citra satelit.',
            ],
            [
                'name' => 'Alternative Data',
                'description' => 'Eksplorasi sumber data alternatif untuk statistik resmi.',
            ],
        ];

        $categories = collect();

        foreach ($categoryData as $data) {
            $categories->push(
                Category::create([
                    'name' => $data['name'],
                    'slug' => Str::slug($data['name']),
                    'description' => $data['description'],
                ])
            );
        }

        /*
        |--------------------------------------------------------------------------
        | STUDY TITLES
        |--------------------------------------------------------------------------
        */

        $studyTitles = [
            'Analisis Tren Pencarian Informasi Statistik Menggunakan Google Trends',
            'Pemanfaatan Web Scraping untuk Pemantauan Harga Komoditas',
            'Analisis Sentimen Masyarakat terhadap Kebijakan Publik',
            'Eksplorasi Big Data untuk Mendukung Statistik Pariwisata',
            'Pemanfaatan Citra Satelit untuk Estimasi Tutupan Lahan',
            'Analisis Mobilitas Penduduk Menggunakan Data Agregat',
            'Pemanfaatan Data Media Sosial sebagai Indikator Aktivitas Ekonomi',
            'Klasifikasi Dokumen Statistik Menggunakan Text Mining',
            'Prediksi Harga Pangan Menggunakan Machine Learning',
            'Analisis Tren Konsumsi Digital Masyarakat Indonesia',
            'Pemanfaatan Data Marketplace untuk Analisis Perdagangan',
            'Deteksi Perubahan Penggunaan Lahan Berbasis Computer Vision',
            'Pemodelan Kepadatan Penduduk Menggunakan Data Geospasial',
            'Analisis Topik Percakapan Publik di Media Sosial',
            'Eksplorasi Data Alternatif untuk Indikator Ekonomi',
            'Pemanfaatan Data Berita Online untuk Economic Nowcasting',
            'Estimasi Aktivitas Perdagangan Menggunakan Data Transaksi Digital',
            'Analisis Pola Perjalanan Masyarakat Menggunakan Data Mobilitas',
            'Pemanfaatan Data OpenStreetMap untuk Statistik Wilayah',
            'Analisis Produk Rumah Tangga dari Data Marketplace',
            'Pemodelan Risiko Banjir Berbasis Data Spasial',
            'Analisis Perkembangan UMKM Menggunakan Data Digital',
            'Pemanfaatan Data Review Online untuk Indikator Pariwisata',
            'Klasifikasi Citra Bangunan Menggunakan Deep Learning',
            'Analisis Perubahan Harga Komoditas dari Data Online',
            'Pemanfaatan Data Transportasi Online untuk Mobilitas Penduduk',
            'Analisis Sentimen terhadap Harga Kebutuhan Pokok',
            'Identifikasi Wilayah Perkotaan Menggunakan Citra Satelit',
            'Eksplorasi Data Digital untuk Statistik Ketenagakerjaan',
            'Pemanfaatan Data Mesin Pencari untuk Indikator Sosial',
        ];

        /*
        |--------------------------------------------------------------------------
        | STATUS DISTRIBUTION
        |--------------------------------------------------------------------------
        |
        | 60 studies
        |
        | draft             8
        | submitted         8
        | under_review      6
        | revision          6
        | director_review   6
        | published        20
        | rejected          6
        |
        */

        $statusPlan = array_merge(
            array_fill(0, 8, 'draft'),
            array_fill(0, 8, 'submitted'),
            array_fill(0, 6, 'under_review'),
            array_fill(0, 6, 'revision'),
            array_fill(0, 6, 'director_review'),
            array_fill(0, 20, 'published'),
            array_fill(0, 6, 'rejected'),
        );

        $studies = collect();

        foreach ($statusPlan as $index => $status) {
            $researcher = $researchers->random();
            $category = $categories->random();

            $baseTitle = $studyTitles[$index % count($studyTitles)];

            $title = $index < count($studyTitles)
                ? $baseTitle
                : $baseTitle . ' - Studi ' . ($index + 1);

            $createdAt = $faker->dateTimeBetween(
                '-12 months',
                '-2 days'
            );

            $publishedAt = $status === 'published'
                ? $faker->dateTimeBetween(
                    $createdAt,
                    'now'
                )
                : null;

            $currentReviewerId = null;

            if ($status === 'under_review') {
                $currentReviewerId = $reviewers->random()->id;
            }

            $study = Study::create([
                'author_id' => $researcher->id,
                'user_id' => $researcher->id,
                'category_id' => $category->id,
                'current_reviewer_id' => $currentReviewerId,

                'title' => $title,
                'slug' => Str::slug($title) . '-' . Str::lower(Str::random(6)),
                'excerpt' => $faker->paragraph(2),
                'cover_image' => null,
                'content' => $this->generateContent($faker),

                'status' => $status,
                'published_at' => $publishedAt,

                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            $studies->push($study);

            /*
            |--------------------------------------------------------------------------
            | REVIEW HISTORY
            |--------------------------------------------------------------------------
            */

            // 1. STUDIES YANG SUDAH LOLOS REVIEWER
            if (in_array($status, [
                'director_review',
                'published',
            ])) {
                StudyReview::create([
                    'study_id' => $study->id,
                    'reviewer_id' => $reviewers->random()->id,
                    'decision' => 'approved',
                    'stage' => 'reviewer',
                    'notes' => 'Kajian memenuhi persyaratan review tahap pertama.',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            }

            // 2. REVISION
            if ($status === 'revision') {

                // 3 pertama = revision dari Reviewer
                // 3 berikutnya = revision dari Direktur

                $revisionIndex = $index - 16;

                if ($revisionIndex < 3) {
                    StudyReview::create([
                        'study_id' => $study->id,
                        'reviewer_id' => $reviewers->random()->id,
                        'decision' => 'revision',
                        'stage' => 'reviewer',
                        'notes' => $faker->sentence(18),
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                    ]);
                } else {
                    // Reviewer lulus dulu
                    StudyReview::create([
                        'study_id' => $study->id,
                        'reviewer_id' => $reviewers->random()->id,
                        'decision' => 'approved',
                        'stage' => 'reviewer',
                        'notes' => 'Kajian diteruskan ke review final.',
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                    ]);

                    StudyReview::create([
                        'study_id' => $study->id,
                        'reviewer_id' => $director->id,
                        'decision' => 'revision',
                        'stage' => 'director',
                        'notes' => $faker->sentence(18),
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                    ]);
                }
            }

            // 3. REJECTED
            if ($status === 'rejected') {

                $rejectedIndex = $index - 46;

                if ($rejectedIndex < 3) {
                    StudyReview::create([
                        'study_id' => $study->id,
                        'reviewer_id' => $reviewers->random()->id,
                        'decision' => 'rejected',
                        'stage' => 'reviewer',
                        'notes' => $faker->sentence(18),
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                    ]);
                } else {
                    StudyReview::create([
                        'study_id' => $study->id,
                        'reviewer_id' => $reviewers->random()->id,
                        'decision' => 'approved',
                        'stage' => 'reviewer',
                        'notes' => 'Kajian diteruskan ke review final.',
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                    ]);

                    StudyReview::create([
                        'study_id' => $study->id,
                        'reviewer_id' => $director->id,
                        'decision' => 'rejected',
                        'stage' => 'director',
                        'notes' => 'Kajian belum memenuhi kriteria publikasi.',
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                    ]);
                }
            }

            // 4. PUBLISHED
            if ($status === 'published') {

                StudyReview::create([
                    'study_id' => $study->id,
                    'reviewer_id' => $reviewers->random()->id,
                    'decision' => 'approved',
                    'stage' => 'reviewer',
                    'notes' => 'Kajian diteruskan ke review final.',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);

                StudyReview::create([
                    'study_id' => $study->id,
                    'reviewer_id' => $director->id,
                    'decision' => 'approved',
                    'stage' => 'director',
                    'notes' => 'Kajian disetujui dan diterbitkan.',
                    'created_at' => $publishedAt ?? $createdAt,
                    'updated_at' => $publishedAt ?? $createdAt,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | ENGAGEMENT
            |--------------------------------------------------------------------------
            */

            if ($status === 'published') {

                /*
                | Views
                */

                foreach (range(1, random_int(30, 180)) as $viewIndex) {

                    $visitorHash = hash(
                        'sha256',
                        'dummy-visitor|' .
                        $study->id .
                        '|' .
                        $viewIndex
                    );

                    StudyView::create([
                        'study_id' => $study->id,
                        'user_id' => null,
                        'session_id' => 'dummy-session-' . Str::uuid(),
                        'visitor_hash' => $visitorHash,
                        'created_at' => $faker->dateTimeBetween(
                            $publishedAt ?? $createdAt,
                            'now'
                        ),
                    ]);
                }

                /*
                | Likes
                */

                foreach (range(1, random_int(5, 35)) as $likeIndex) {

                    $likeUser = $researchers->random();

                    StudyLike::create([
                        'study_id' => $study->id,
                        'user_id' => $likeUser->id,
                        'session_id' => 'dummy-like-' . Str::uuid(),
                    ]);
                }

                /*
                | Comments
                */

                foreach (range(1, random_int(2, 12)) as $commentIndex) {

                    $commentUser = $researchers->random();

                    StudyComment::create([
                        'study_id' => $study->id,
                        'user_id' => $commentUser->id,
                        'comment' => $faker->sentence(
                            random_int(10, 20)
                        ),
                        'status' => 'approved',
                        'created_at' => $faker->dateTimeBetween(
                            $publishedAt ?? $createdAt,
                            'now'
                        ),
                    ]);
                }

                /*
                | Shares
                */

                $platforms = [
                    'copy',
                    'whatsapp',
                    'x',
                    'linkedin',
                ];

                foreach (range(1, random_int(3, 20)) as $shareIndex) {

                    $shareUser = $researchers->random();

                    StudyShare::create([
                        'study_id' => $study->id,
                        'user_id' => $shareUser->id,
                        'session_id' => 'dummy-share-' . Str::uuid(),
                        'platform' => $platforms[array_rand($platforms)],
                        'created_at' => $faker->dateTimeBetween(
                            $publishedAt ?? $createdAt,
                            'now'
                        ),
                    ]);
                }
            }
        }

        /*
        |--------------------------------------------------------------------------
        | DELETION REQUESTS
        |--------------------------------------------------------------------------
        */

        $deletionCandidates = $studies
            ->whereIn('status', [
                'draft',
                'revision',
                'rejected',
                'published',
            ])
            ->shuffle()
            ->take(9);

        foreach ($deletionCandidates as $index => $study) {

            $researcher = $researchers->random();

            $status = match ($index % 3) {
                0 => 'pending',
                1 => 'approved',
                default => 'rejected',
            };

            StudyDeletionRequest::create([
                'study_id' => $study->id,
                'user_id' => $researcher->id,
                'reason' => $faker->paragraph(),
                'status' => $status,
                'admin_id' => $status === 'pending'
                    ? null
                    : $admin->id,
                'admin_notes' => $status === 'pending'
                    ? null
                    : $faker->sentence(),
                'processed_at' => $status === 'pending'
                    ? null
                    : now()->subDays(random_int(1, 30)),
            ]);
        }
    }

    private function generateContent($faker): string
    {
        $sections = [
            'Latar Belakang',
            'Metodologi',
            'Hasil dan Pembahasan',
            'Kesimpulan',
        ];

        $html = '';

        foreach ($sections as $section) {
            $html .= '<h2>' . $section . '</h2>';
            $html .= '<p>' . $faker->paragraph(5) . '</p>';
            $html .= '<p>' . $faker->paragraph(4) . '</p>';
        }

        return $html;
    }
}