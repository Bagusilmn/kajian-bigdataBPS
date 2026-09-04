<?php

namespace App\Http\Controllers\Reviewer;

use App\Http\Controllers\Controller;
use App\Models\Study;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StudyController extends Controller
{
    /**
     * Menampilkan detail kajian.
     */
    public function show(Study $study)
    {
        $userId = auth()->id();

        $canView = (
            $study->status === 'submitted'
            && $study->current_reviewer_id === null
        ) || (
            $study->status === 'under_review'
            && $study->current_reviewer_id === $userId
        );

        if (! $canView) {
            abort(403);
        }

        $study->load([
            'user',
            'category',
        ]);

        return Inertia::render('Reviewer/StudyReview', [
            'study' => $study,
        ]);
    }


    /**
     * Reviewer mulai melakukan review.
     */
    public function startReview(Study $study)
    {
        DB::transaction(function () use ($study) {

            $study = Study::where('id', $study->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($study->status !== 'submitted') {
                abort(
                    409,
                    'Kajian ini tidak tersedia untuk direview.'
                );
            }

            if ($study->current_reviewer_id !== null) {
                abort(
                    409,
                    'Kajian ini sudah diambil oleh reviewer lain.'
                );
            }

            $study->update([
                'status' => 'under_review',
                'current_reviewer_id' => auth()->id(),
            ]);
        });

        return redirect()
            ->route('reviewer.studies.show', $study)
            ->with(
                'success',
                'Kajian berhasil diambil dan sekarang menjadi tanggung jawab Anda.'
            );
    }


    /**
     * Reviewer menyetujui kajian.
     */
    public function approve(Study $study)
    {
        if ($study->status !== 'under_review') {
            return back()->with(
                'error',
                'Kajian belum berada dalam proses review.'
            );
        }

        if ($study->current_reviewer_id !== auth()->id()) {
            abort(403);
        }

        // Simpan hasil review Reviewer
        $study->reviews()->create([
            'reviewer_id' => auth()->id(),
            'decision' => 'approved',
            'stage' => 'reviewer',
            'notes' => $study->approval_flow === 'reviewer'
                ? 'Kajian disetujui dan dipublikasikan.'
                : 'Kajian diteruskan ke Direktur.',
        ]);

        // Jika hanya membutuhkan 1 Reviewer,
        // langsung publish setelah Reviewer menyetujui.
        if ($study->approval_flow === 'reviewer') {
            $study->update([
                'status' => 'published',
                'published_at' => now(),
                'current_reviewer_id' => null,
            ]);

            return redirect()
                ->route('reviewer.dashboard')
                ->with(
                    'success',
                    'Kajian berhasil disetujui dan dipublikasikan.'
                );
        }

        // Jika membutuhkan Reviewer + Direktur,
        // lanjutkan ke tahap review Direktur.
        $study->update([
            'status' => 'director_review',
            'current_reviewer_id' => null,
        ]);

        return redirect()
            ->route('reviewer.dashboard')
            ->with(
                'success',
                'Kajian berhasil diteruskan ke Direktur.'
            );
    }


    /**
     * Reviewer meminta revisi.
     */
    public function requestRevision(Request $request, Study $study)
    {
        if ($study->status !== 'under_review') {
            return back()->with(
                'error',
                'Kajian belum berada dalam proses review.'
            );
        }
        if ($study->current_reviewer_id !== auth()->id()) {
            abort(403);
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
            'stage' => 'reviewer',
            'notes' => $validated['notes'],
        ]);

        $study->update([
            'status' => 'revision',
            'current_reviewer_id' => null,
        ]);

        return redirect()
            ->route('reviewer.dashboard')
            ->with(
                'success',
                'Kajian dikembalikan untuk revisi.'
            );
    }


    /**
     * Reviewer menolak kajian.
     */
    public function reject(Study $study)
    {
        if ($study->status !== 'under_review') {
            return back()->with(
                'error',
                'Kajian belum berada dalam proses review.'
            );
        }

        if ($study->current_reviewer_id !== auth()->id()) {
            abort(403);
        }

        $study->reviews()->create([
            'reviewer_id' => auth()->id(),
            'decision' => 'rejected',
            'stage' => 'reviewer',
            'notes' => 'Kajian ditolak oleh Reviewer.',
        ]);

        $study->update([
            'status' => 'rejected',
            'current_reviewer_id' => null,
        ]);

        return redirect()
            ->route('reviewer.dashboard')
            ->with(
                'success',
                'Kajian berhasil ditolak.'
            );
    }
}