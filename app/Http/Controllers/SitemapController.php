<?php

namespace App\Http\Controllers;

use App\Models\Study;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $studies = Study::query()
            ->where('status', 'published')
            ->orderByDesc('published_at')
            ->get([
                'slug',
                'updated_at',
            ]);

        $urls = collect([
            [
                'loc' => url('/'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'daily',
                'priority' => '1.0',
            ],
            [
                'loc' => url('/kajian'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'daily',
                'priority' => '0.9',
            ],
        ]);

        foreach ($studies as $study) {
            $urls->push([
                'loc' => url('/kajian/' . $study->slug),
                'lastmod' => (
                    $study->updated_at ?? now()
                )->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ]);
        }

        $xml = view('sitemap', [
            'urls' => $urls,
        ])->render();

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }
}