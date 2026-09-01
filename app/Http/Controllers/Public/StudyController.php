<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Study;
use Illuminate\Http\Request;
use App\Models\StudyView;
use App\Models\StudyLike;
use App\Models\StudyComment;
use App\Models\StudyShare;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class StudyController extends Controller
{
    public function index(Request $request)
    {
        $query = Study::with([
            'category',
            'keywords',
        ])
            ->where('status', 'published');

        if ($request->filled('search')) {

            $search = $request->search;

            $query->where(function ($q) use ($search) {

                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhereHas('keywords', function ($keywordQuery) use ($search) {
                        $keywordQuery->where(
                            'name',
                            'like',
                            "%{$search}%"
                        );
                    });

            });
        }

        if ($request->filled('category')) {

            $query->where(
                'category_id',
                $request->category
            );
        }

        $studies = $query
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $categories = Category::orderBy('name')->get();

        return Inertia::render('Public/Studies', [
            'studies' => $studies,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
            ],
        ]);
    }

    public function show($slug, Request $request)
    {
        $study = Study::with([
            'category',
            'keywords',
            'user',
        ])
        ->where('slug', $slug)
        ->where(function ($query) {

            // Kajian yang sudah published bisa dilihat publik
            $query->where('status', 'published');

            // Kajian dengan status lain hanya bisa dilihat oleh pemiliknya
            if (Auth::check()) {
                $query->orWhere(function ($query) {
                    $query->where('user_id', Auth::id())
                        ->whereIn('status', [
                            'draft',
                            'submitted',
                            'under_review',
                            'revision',
                            'director_review',
                            'rejected',
                        ]);
                });
            }

        })
        ->firstOrFail();

        /*
        |--------------------------------------------------------------------------
        | VIEW TRACKING
        |--------------------------------------------------------------------------
        */

        $sessionId = session()->getId();

        $visitorHash = hash(
            'sha256',
            $request->ip() . '|' . $request->userAgent()
        );

        $viewQuery = $study->views();

        if (Auth::check()) {
            $viewQuery->where('user_id', Auth::id());
        } else {
            $viewQuery
                ->whereNull('user_id')
                ->where('visitor_hash', $visitorHash);
        }

        $alreadyViewedRecently = $viewQuery
            ->where(
                'created_at',
                '>=',
                now()->subMinutes(30)
            )
            ->exists();

        if (! $alreadyViewedRecently) {
            StudyView::create([
                'study_id' => $study->id,
                'user_id' => Auth::id(),
                'session_id' => $sessionId,
                'visitor_hash' => $visitorHash,
            ]);
        }


        /*
        |--------------------------------------------------------------------------
        | VIEW STATISTICS
        |--------------------------------------------------------------------------
        */

        $totalViews = $study->views()->count();

        $uniqueRegisteredVisitors = $study->views()
            ->whereNotNull('user_id')
            ->distinct()
            ->count('user_id');

        $uniqueGuestVisitors = $study->views()
            ->whereNull('user_id')
            ->whereNotNull('visitor_hash')
            ->distinct()
            ->count('visitor_hash');

        $uniqueVisitors =
            $uniqueRegisteredVisitors +
            $uniqueGuestVisitors;


        /*
        |--------------------------------------------------------------------------
        | RECOMMENDATIONS
        |--------------------------------------------------------------------------
        */

        $studyKeywordIds = $study->keywords->pluck('id');

        $recommendedStudies = collect();

        if ($studyKeywordIds->isNotEmpty()) {

            $recommendedStudies = Study::with([
                    'category',
                    'keywords',
                ])
                ->where('status', 'published')
                ->where('id', '!=', $study->id)
                ->whereHas('keywords', function ($query) use ($studyKeywordIds) {
                    $query->whereIn(
                        'keywords.id',
                        $studyKeywordIds
                    );
                })
                ->withCount([
                    'keywords as matching_keywords_count' => function ($query) use ($studyKeywordIds) {
                        $query->whereIn(
                            'keywords.id',
                            $studyKeywordIds
                        );
                    },
                ])
                ->orderByDesc('matching_keywords_count')
                ->orderByRaw(
                    'CASE WHEN category_id = ? THEN 1 ELSE 0 END DESC',
                    [$study->category_id]
                )
                ->latest('published_at')
                ->take(3)
                ->get();
        }


        /*
        |--------------------------------------------------------------------------
        | FALLBACK
        |--------------------------------------------------------------------------
        */

        if ($recommendedStudies->count() < 3) {

            $additionalStudies = Study::with([
                    'category',
                    'keywords',
                ])
                ->where('status', 'published')
                ->where('id', '!=', $study->id)
                ->whereNotIn(
                    'id',
                    $recommendedStudies->pluck('id')
                )
                ->where('category_id', $study->category_id)
                ->latest('published_at')
                ->take(
                    3 - $recommendedStudies->count()
                )
                ->get();

            $recommendedStudies = $recommendedStudies
                ->concat($additionalStudies)
                ->unique('id')
                ->values();
        }


        /*
        |--------------------------------------------------------------------------
        | LIKES
        |--------------------------------------------------------------------------
        */

        $totalLikes = $study->likes()->count();

        if (Auth::check()) {

            $hasLiked = $study->likes()
                ->where(function ($query) use ($sessionId) {

                    $query->where('user_id', Auth::id())
                        ->orWhere('session_id', $sessionId);

                })
                ->exists();

        } else {

            $hasLiked = $study->likes()
                ->where('session_id', $sessionId)
                ->exists();

        }


        /*
        |--------------------------------------------------------------------------
        | COMMENTS
        |--------------------------------------------------------------------------
        */

        $comments = $study->comments()
            ->with('user:id,name')
            ->where('status', 'approved')
            ->latest()
            ->paginate(5)
            ->withQueryString();

        $totalComments = $comments->total();

        /*
        |--------------------------------------------------------------------------
        | RESPONSE
        |--------------------------------------------------------------------------
        */
        $seoUrl = url('/kajian/' . $study->slug);

        $seoImage = $study->cover_image
            ? asset('storage/' . $study->cover_image)
            : null;

        $seoDescription = $study->excerpt
            ?: Str::limit(
                strip_tags($study->content),
                160
            );
        return Inertia::render('Public/StudyDetail', [
            'study' => $study,

            'seo' => [
                'title' => $study->title . ' | Kajian Big Data BPS',
                'description' => $seoDescription,
                'url' => $seoUrl,
                'image' => $seoImage,
            ],

            'totalViews' => $totalViews,
            'uniqueVisitors' => $uniqueVisitors,

            'totalLikes' => $totalLikes,
            'hasLiked' => $hasLiked,

            'comments' => $comments,
            'totalComments' => $totalComments,

            'recommendedStudies' => $recommendedStudies,
        ]);
    }
    public function toggleLike($slug)
    {
        $study = Study::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $sessionId = session()->getId();

        $query = StudyLike::where('study_id', $study->id);

        if (Auth::check()) {
            $query->where(function ($q) use ($sessionId) {
                $q->where('user_id', Auth::id())
                    ->orWhere('session_id', $sessionId);
            });
        } else {
            $query->where('session_id', $sessionId);
        }

        $existingLike = $query->first();

        if ($existingLike) {
            $existingLike->delete();

            $liked = false;
        } else {
            StudyLike::create([
                'study_id' => $study->id,
                'user_id' => Auth::id(),
                'session_id' => $sessionId,
            ]);

            $liked = true;
        }

        return back()->with([
            'liked' => $liked,
            'totalLikes' => $study->likes()->count(),
        ]);
    }

    public function storeComment(Request $request, $slug)
    {
        $study = Study::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $validated = $request->validate([
            'comment' => [
                'required',
                'string',
                'min:3',
                'max:2000',
            ],
        ]);

        StudyComment::create([
            'study_id' => $study->id,
            'user_id' => Auth::id(),
            'comment' => $validated['comment'],
            'status' => 'approved',
        ]);

        return back()
            ->with(
                'success',
                'Komentar berhasil dikirim.'
            );
    }
    public function share(Request $request, $slug)
    {
        $study = Study::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $validated = $request->validate([
            'platform' => [
                'nullable',
                'string',
                'max:50',
            ],
        ]);

        StudyShare::create([
            'study_id' => $study->id,
            'user_id' => Auth::id(),
            'session_id' => session()->getId(),
            'platform' => $validated['platform'] ?? 'copy',
        ]);

        return back()->with([
            'shared' => true,
            'totalShares' => $study->shares()->count(),
        ]);
    }
}