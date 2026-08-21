<?php

namespace App\Http\Controllers\Director;

use App\Http\Controllers\Controller;
use App\Models\Study;
use App\Models\StudyReview;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $directorStudies = Study::with([
                'user',
                'category',
            ])
            ->where('status', 'director_review')
            ->latest()
            ->get();

        $revisionStudies = Study::where('status', 'revision')
            ->count();

        $publishedStudies = Study::where('status', 'published')
            ->count();

        $rejectedStudies = Study::where('status', 'rejected')
            ->count();

        return Inertia::render('Director/Dashboard', [
            'directorStudies' => $directorStudies,
            'revisionStudies' => $revisionStudies,
            'publishedStudies' => $publishedStudies,
            'rejectedStudies' => $rejectedStudies,
        ]);
    }
    public function analytics()
    {
        /*
        |--------------------------------------------------------------------------
        | CURRENT STATUS
        |--------------------------------------------------------------------------
        */

        $directorReviewStudies = Study::where(
            'status',
            'director_review'
        )->count();

        $revisionStudies = Study::where(
            'status',
            'revision'
        )->count();

        $publishedStudies = Study::where(
            'status',
            'published'
        )->count();

        $rejectedStudies = Study::where(
            'status',
            'rejected'
        )->count();


        /*
        |--------------------------------------------------------------------------
        | DECISION HISTORY
        |--------------------------------------------------------------------------
        */

        $directorReviews = StudyReview::where(
            'stage',
            'director'
        );

        $approvedDecisions = (clone $directorReviews)
            ->where('decision', 'approved')
            ->count();

        $revisionDecisions = (clone $directorReviews)
            ->where('decision', 'revision')
            ->count();

        $rejectedDecisions = (clone $directorReviews)
            ->where('decision', 'rejected')
            ->count();


        $totalDecisions =
            $approvedDecisions +
            $revisionDecisions +
            $rejectedDecisions;


        $approvalRate = $totalDecisions > 0
            ? round(
                ($approvedDecisions / $totalDecisions) * 100,
                2
            )
            : 0;

        $revisionRate = $totalDecisions > 0
            ? round(
                ($revisionDecisions / $totalDecisions) * 100,
                2
            )
            : 0;

        $rejectionRate = $totalDecisions > 0
            ? round(
                ($rejectedDecisions / $totalDecisions) * 100,
                2
            )
            : 0;


        /*
        |--------------------------------------------------------------------------
        | HISTORY
        |--------------------------------------------------------------------------
        */

        $recentReviews = StudyReview::with([
                'study.category',
            ])
            ->where('stage', 'director')
            ->latest()
            ->take(10)
            ->get();


        /*
        |--------------------------------------------------------------------------
        | DECISION CHART
        |--------------------------------------------------------------------------
        */

        $decisionLabels = [
            'Approved',
            'Revision',
            'Rejected',
        ];

        $decisionData = [
            $approvedDecisions,
            $revisionDecisions,
            $rejectedDecisions,
        ];
        $statusLabels = [
            'Menunggu Review Final',
            'Revision',
            'Published',
            'Rejected',
        ];

        $statusData = [
            $directorReviewStudies,
            $revisionStudies,
            $publishedStudies,
            $rejectedStudies,
        ];

        /*
        |--------------------------------------------------------------------------
        | TREND 7 DAYS
        |--------------------------------------------------------------------------
        */

        $reviewsLast7Days = StudyReview::where('stage', 'director')
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

            $record = $reviewsLast7Days
                ->firstWhere('date', $key);

            $trendData[] = $record
                ? (int) $record->total
                : 0;
        }


        return Inertia::render('Director/Analytics', [

            /*
            | Current status
            */

            'directorReviewStudies' => $directorReviewStudies,
            'revisionStudies' => $revisionStudies,
            'publishedStudies' => $publishedStudies,
            'rejectedStudies' => $rejectedStudies,
            'statusLabels' => $statusLabels,
            'statusData' => $statusData,
            /*
            | History
            */

            'approvedDecisions' => $approvedDecisions,
            'revisionDecisions' => $revisionDecisions,
            'rejectedDecisions' => $rejectedDecisions,

            'totalDecisions' => $totalDecisions,

            'approvalRate' => $approvalRate,
            'revisionRate' => $revisionRate,
            'rejectionRate' => $rejectionRate,

            'recentReviews' => $recentReviews,

            /*
            | Charts
            */

            'decisionLabels' => $decisionLabels,
            'decisionData' => $decisionData,

            'trendLabels' => $trendLabels,
            'trendData' => $trendData,
        ]);
    }
}