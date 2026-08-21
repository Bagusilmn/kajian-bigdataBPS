<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Study;
use App\Models\StudyDeletionRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudyController extends Controller
{
    /**
     * Daftar kajian dan request penghapusan.
     */
    public function index()
    {
        $studies = Study::with([
                'user',
                'category',
            ])
            ->latest()
            ->get();

        $deletionRequests = StudyDeletionRequest::with([
                'study',
                'user',
            ])
            ->where('status', 'pending')
            ->latest()
            ->get();

        return Inertia::render('Admin/Studies/Index', [
            'studies' => $studies,
            'deletionRequests' => $deletionRequests,
        ]);
    }


    /**
     * Admin menyetujui request penghapusan.
     */
    public function approveDeletion(
        Request $request,
        StudyDeletionRequest $deletionRequest
    ) {
        if ($deletionRequest->status !== 'pending') {
            return back()->with(
                'error',
                'Request penghapusan ini sudah diproses.'
            );
        }

        $study = $deletionRequest->study;

        if (! $study) {
            return back()->with(
                'error',
                'Kajian yang diminta untuk dihapus tidak ditemukan.'
            );
        }

        $deletionRequest->update([
            'status' => 'approved',
            'admin_id' => auth()->id(),
            'processed_at' => now(),
        ]);

        $study->delete();

        return redirect()
            ->route('admin.studies.index')
            ->with(
                'success',
                'Request disetujui dan kajian berhasil dihapus.'
            );
    }


    /**
     * Admin menolak request penghapusan.
     */
    public function rejectDeletion(
        Request $request,
        StudyDeletionRequest $deletionRequest
    ) {
        if ($deletionRequest->status !== 'pending') {
            return back()->with(
                'error',
                'Request penghapusan ini sudah diproses.'
            );
        }

        $validated = $request->validate([
            'admin_notes' => [
                'required',
                'string',
                'max:2000',
            ],
        ]);

        $deletionRequest->update([
            'status' => 'rejected',
            'admin_id' => auth()->id(),
            'admin_notes' => $validated['admin_notes'],
            'processed_at' => now(),
        ]);

        return redirect()
            ->route('admin.studies.index')
            ->with(
                'success',
                'Request penghapusan berhasil ditolak.'
            );
    }
}