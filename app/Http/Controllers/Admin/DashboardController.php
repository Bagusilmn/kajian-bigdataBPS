<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Study;
use App\Models\StudyView;
use App\Models\StudyLike;
use App\Models\StudyComment;
use App\Models\StudyShare;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $statusCounts = Study::query()
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $publishedStudies =
            (int) ($statusCounts['published'] ?? 0);

        $directorReviewStudies =
            (int) ($statusCounts['director_review'] ?? 0);

        $rejectedStudies =
            (int) ($statusCounts['rejected'] ?? 0);

        $submittedStudies =
            (int) ($statusCounts['submitted'] ?? 0);

        $underReviewStudies =
            (int) ($statusCounts['under_review'] ?? 0);

        $revisionStudies =
            (int) ($statusCounts['revision'] ?? 0);

        $draftStudies =
            (int) ($statusCounts['draft'] ?? 0);

        $totalViews = StudyView::count();
        $totalLikes = StudyLike::count();

        $totalComments = StudyComment::where('status', 'approved')
            ->count();
        $draftStudies = Study::where('status', 'draft')
            ->count();
        $totalShares = StudyShare::count();
        $uniqueVisitors = StudyView::query()
            ->select('session_id')
            ->whereNotNull('session_id')
            ->distinct()
            ->count('session_id');

        $totalStudies = $statusCounts->sum();

        $topStudies = Study::with([
                'category',
            ])
            ->withCount([
                'views',
                'likes',
                'comments' => function ($query) {
                    $query->where('status', 'approved');
                },
                'shares',
            ])
            ->where('status', 'published')
            ->orderByRaw(
                'CASE
                    WHEN views_count > 0 THEN
                        (
                            (likes_count + comments_count + shares_count)
                            / views_count
                        ) * 100
                    ELSE 0
                END DESC'
            )
            ->take(5)
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
                            )
                            / $study->views_count
                            * 100,
                            2
                        )
                        : 0;

                return $study;
            });

        $viewsLast7Days = StudyView::query()
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
        $statusLabels = [
            'Draft',
            'Submitted',
            'Under Review',
            'Revision',
            'Director Review',
            'Published',
            'Rejected',
        ];

        $statusData = [
            $draftStudies,
            $submittedStudies,
            $underReviewStudies,
            $revisionStudies,
            $directorReviewStudies,
            $publishedStudies,
            $rejectedStudies,
        ];
        return Inertia::render('Admin/Dashboard', [
            'publishedStudies' => $publishedStudies,
            'submittedStudies' => $submittedStudies,
            'underReviewStudies' => $underReviewStudies,
            'revisionStudies' => $revisionStudies,
            'directorReviewStudies' => $directorReviewStudies,
            'rejectedStudies' => $rejectedStudies,

            'totalViews' => $totalViews,
            'totalLikes' => $totalLikes,
            'totalComments' => $totalComments,
            'totalShares' => $totalShares,
            'uniqueVisitors' => $uniqueVisitors,
            'totalStudies' => $totalStudies,

            'topStudies' => $topStudies,
            'trendLabels' => $trendLabels,
            'trendData' => $trendData,
            'draftStudies' => $draftStudies,

            'statusLabels' => $statusLabels,
            'statusData' => $statusData,
        ]);
    }

}