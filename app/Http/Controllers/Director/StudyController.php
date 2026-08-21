<?php

namespace App\Http\Controllers\Director;

use App\Http\Controllers\Controller;
use App\Models\Study;
use Illuminate\Http\Request;

class StudyController extends Controller
{
    /**
     * Menampilkan detail kajian untuk review final.
     */
    public function show(Study $study)
    {
        if ($study->status !== 'director_review') {
            abort(403);
        }

        $study->load([
            'user',
            'category',
            'reviews' => function ($query) {
                $query->with('reviewer')
                    ->latest();
            },
        ]);

        return inertia('Director/StudyReview', [
            'study' => $study,
        ]);
    }


    /**
     * Direktur menyetujui kajian dan menerbitkannya.
     */
    public function approve(Study $study)
    {
        if ($study->status !== 'director_review') {
            return back()->with(
                'error',
                'Kajian belum berada dalam tahap review Direktur.'
            );
        }

        $study->reviews()->create([
            'reviewer_id' => auth()->id(),
            'decision' => 'approved',
            'stage' => 'director',
            'notes' => 'Kajian disetujui dan diterbitkan oleh Direktur.',
        ]);

        $study->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        return redirect()
            ->route('director.dashboard')
            ->with(
                'success',
                'Kajian berhasil disetujui dan diterbitkan.'
            );
    }


    /**
     * Direktur meminta revisi.
     */
    public function requestRevision(Request $request, Study $study)
    {
        if ($study->status !== 'director_review') {
            return back()->with(
                'error',
                'Kajian belum berada dalam tahap review Direktur.'
            );
        }

        $validated = $request->validate([
            'notes' => [
                'required',
                'string',
                'max:5000',
            ],
        ]);

        $study->reviews()->create([
            'reviewer_id' => auth()->id(),
            'decision' => 'revision',
            'stage' => 'director',
            'notes' => $validated['notes'],
        ]);

        $study->update([
            'status' => 'revision',
        ]);

        return redirect()
            ->route('director.dashboard')
            ->with(
                'success',
                'Kajian dikembalikan kepada Peneliti untuk revisi.'
            );
    }


    /**
     * Direktur menolak kajian.
     */
    public function reject(Study $study)
    {
        if ($study->status !== 'director_review') {
            return back()->with(
                'error',
                'Kajian belum berada dalam tahap review Direktur.'
            );
        }

        $study->reviews()->create([
            'reviewer_id' => auth()->id(),
            'decision' => 'rejected',
            'stage' => 'director',
            'notes' => 'Kajian ditolak oleh Direktur.',
        ]);

        $study->update([
            'status' => 'rejected',
        ]);

        return redirect()
            ->route('director.dashboard')
            ->with(
                'success',
                'Kajian berhasil ditolak.'
            );
}
}