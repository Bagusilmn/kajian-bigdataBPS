<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Study;
use Inertia\Inertia;
// use App\Models\StudyView;
// use App\Models\StudyLike;
// use App\Models\StudyComment;
// use App\Models\StudyShare;

class HomeController extends Controller
{
    public function index()
    {
        $study = Study::find(62);

        if ($study && $study->status === 'published' && is_null($study->published_at)) {
            $study->forceFill([
                'published_at' => now(),
            ])->save();
        }

        $latestStudies = Study::with(['category'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->take(3)
            ->get();

        $featuredStudy = Study::with([
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
            ->first();

        $categories = Category::withCount([
            'studies' => function ($query) {
                $query->where('status', 'published');
            },
        ])
            ->orderBy('name')
            ->get();

        return Inertia::render('Public/Home', [
            'featuredStudy' => $featuredStudy,
            'latestStudies' => $latestStudies,
            'categories' => $categories,
        ]);
    }
}