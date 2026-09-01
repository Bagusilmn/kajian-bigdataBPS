<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Study;
use Inertia\Inertia;


class HomeController extends Controller
{
    public function index()
    {

        $latestStudies = Study::with(['category'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->take(4)
            ->get();

        $popularStudies = Study::with([
                'category',
            ])
            ->withCount([
                'views',
                'likes',
                'shares',
                'comments' => function ($query) {
                    $query->where('status', 'approved');
                },
            ])
            ->where('status', 'published')
            ->orderByRaw(
                '(views_count
                + (likes_count * 3)
                + (comments_count * 5)
                + (shares_count * 4)) DESC'
            )
            ->take(5)
            ->get();

        $categories = Category::withCount([
            'studies' => function ($query) {
                $query->where('status', 'published');
            },
        ])
            ->orderBy('name')
            ->get();

        return Inertia::render('Public/Home', [
            'popularStudies' => $popularStudies,
            'latestStudies' => $latestStudies,
            'categories' => $categories,
        ]);
    }
}