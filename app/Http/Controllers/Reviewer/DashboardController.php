<?php

namespace App\Http\Controllers\Reviewer;

use App\Http\Controllers\Controller;
use App\Models\Study;
use App\Models\StudyReview;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $submittedStudies = Study::with([
                'user',
                'category',
            ])
            ->where('status', 'submitted')
            ->whereNull('current_reviewer_id')
            ->latest()
            ->get();

        $underReviewStudies = Study::with([
                'user',
                'category',
            ])
            ->where('status', 'under_review')
            ->where('current_reviewer_id', auth()->id())
            ->latest()
            ->get();

        $revisionStudies = Study::where('status', 'revision')
            ->count();
        $underReviewCount = Study::where('status', 'under_review')
            ->where('current_reviewer_id', auth()->id())
            ->count();
        $directorReviewStudies = Study::where('status', 'director_review')
            ->count();

        return Inertia::render('Reviewer/Dashboard', [
            'submittedStudies' => $submittedStudies,
            'underReviewCount' => $underReviewCount,
            'revisionStudies' => $revisionStudies,
            'directorReviewStudies' => $directorReviewStudies,
        ]);
    }
    public function activeStudies()
    {
        $studies = Study::with([
            'user',
            'category',
        ])
        ->where('status', 'under_review')
        ->where('current_reviewer_id', auth()->id())
        ->latest()
        ->get();

        return Inertia::render('Reviewer/ActiveStudies', [
            'studies' => $studies,
        ]);
    }

    public function analytics()
    {
        $reviewerId = auth()->id();

        $reviews = StudyReview::where(
            'reviewer_id',
            $reviewerId
        )->where(
            'stage',
            'reviewer'
        );

        $totalReviews = (clone $reviews)->count();

        $revisionCount = (clone $reviews)
            ->where('decision', 'revision')
            ->count();

        $forwardedCount = (clone $reviews)
            ->where('decision', 'approved')
            ->count();

        $rejectedCount = (clone $reviews)
            ->where('decision', 'rejected')
            ->count();

        $recentReviews = StudyReview::with([
                'study.category',
            ])
            ->where('reviewer_id', $reviewerId)
            ->where('stage', 'reviewer')
            ->latest()
            ->take(10)
            ->get();
        $decisionLabels = [
            'Forwarded',
            'Revision',
            'Rejected',
        ];

        $decisionData = [
            $forwardedCount,
            $revisionCount,
            $rejectedCount,
        ];

        $reviewsLast7Days = StudyReview::where(
                'reviewer_id',
                $reviewerId
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

        $reviewTrendLabels = [];
        $reviewTrendData = [];

        for ($i = 6; $i >= 0; $i--) {

            $date = now()
                ->subDays($i)
                ->startOfDay();

            $key = $date->format('Y-m-d');

            $reviewTrendLabels[] = $date->format('d M');

            $record = $reviewsLast7Days
                ->firstWhere('date', $key);

            $reviewTrendData[] = $record
                ? (int) $record->total
                : 0;
        }
        return Inertia::render('Reviewer/Analytics', [
            'totalReviews' => $totalReviews,
            'revisionCount' => $revisionCount,
            'forwardedCount' => $forwardedCount,
            'rejectedCount' => $rejectedCount,

            'recentReviews' => $recentReviews,

            'decisionLabels' => $decisionLabels,
            'decisionData' => $decisionData,

            'reviewTrendLabels' => $reviewTrendLabels,
            'reviewTrendData' => $reviewTrendData,
        ]);
    }

}