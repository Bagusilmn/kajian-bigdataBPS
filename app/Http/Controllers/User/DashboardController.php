<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Study;
use App\Models\StudyView;
use App\Models\StudyLike;
use App\Models\StudyComment;
use App\Models\StudyShare;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $studies = $user->studies()
            ->with([
                'category',
                'reviews' => function ($query) {
                    $query->latest();
                },
            ])
            ->latest()
            ->get();

        $totalStudies = $user->studies()->count();

        $draftStudies = $user->studies()
            ->where('status', 'draft')
            ->count();

        $reviewStudies = $user->studies()
            ->whereIn('status', [
                'submitted',
                'under_review',
            ])
            ->count();

        $directorReviewStudies = $user->studies()
            ->where('status', 'director_review')
            ->count();

        $rejectedStudies = $user->studies()
            ->where('status', 'rejected')
            ->count();

        $publishedStudies = $user->studies()
            ->where('status', 'published')
            ->count();
        $studyIds = $user->studies()->pluck('id');

        $totalViews = StudyView::whereIn(
            'study_id',
            $studyIds
        )->count();

        $totalLikes = StudyLike::whereIn(
            'study_id',
            $studyIds
        )->count();

        $totalComments = StudyComment::whereIn(
            'study_id',
            $studyIds
        )->where(
            'status',
            'approved'
        )->count();

        $totalShares = StudyShare::whereIn(
            'study_id',
            $studyIds
        )->count();
        return Inertia::render('User/Dashboard', [
            'studies' => $studies,

            'totalStudies' => $totalStudies,
            'draftStudies' => $draftStudies,
            'reviewStudies' => $reviewStudies,
            'directorReviewStudies' => $directorReviewStudies,
            'rejectedStudies' => $rejectedStudies,
            'publishedStudies' => $publishedStudies,

            'totalViews' => $totalViews,
            'totalLikes' => $totalLikes,
            'totalComments' => $totalComments,
            'totalShares' => $totalShares,
        ]);
    }

    public function analytics()
    {
        $user = Auth::user();

        $studyIds = $user->studies()->pluck('id');

        $totalStudies = $studyIds->count();

        $publishedStudies = $user->studies()
            ->where('status', 'published')
            ->count();

        $totalViews = StudyView::whereIn('study_id', $studyIds)->count();

        $totalLikes = StudyLike::whereIn('study_id', $studyIds)->count();

        $totalComments = StudyComment::whereIn('study_id', $studyIds)
            ->where('status', 'approved')
            ->count();

        $totalShares = StudyShare::whereIn('study_id', $studyIds)->count();

        $topStudies = $user->studies()
            ->with('category')
            ->withCount([
                'views',
                'likes',
                'comments' => function ($query) {
                    $query->where('status', 'approved');
                },
                'shares',
            ])
            ->where('status', 'published')
            ->get()
            ->map(function ($study) {
                $study->engagement_score =
                    $study->likes_count +
                    $study->comments_count +
                    $study->shares_count;

                $study->engagement_rate =
                    $study->views_count > 0
                        ? round(
                            (
                                $study->likes_count +
                                $study->comments_count +
                                $study->shares_count
                            ) / $study->views_count * 100,
                            2
                        )
                        : 0;

                return $study;
            })
            ->sortByDesc('engagement_score')
            ->take(5)
            ->values();

        $viewsLast7Days = StudyView::whereIn(
                'study_id',
                $studyIds
            )
            ->where(
                'created_at',
                '>=',
                now()->subDays(6)->startOfDay()
            )
            ->selectRaw(
                'DATE(created_at) as date, COUNT(*) as total'
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $trendLabels = [];
        $trendData = [];

        for ($i = 6; $i >= 0; $i--) {

            $date = now()
                ->subDays($i)
                ->startOfDay();

            $key = $date->format('Y-m-d');

            $trendLabels[] = $date->format('d M');

            $record = $viewsLast7Days
                ->firstWhere('date', $key);

            $trendData[] = $record
                ? (int) $record->total
                : 0;
        }        

        return Inertia::render('User/Analytics', [
            'totalStudies' => $totalStudies,
            'publishedStudies' => $publishedStudies,
            'totalViews' => $totalViews,
            'totalLikes' => $totalLikes,
            'totalComments' => $totalComments,
            'totalShares' => $totalShares,
            'topStudies' => $topStudies,
            'trendLabels' => $trendLabels,
            'trendData' => $trendData,  
        ]);
    }
}