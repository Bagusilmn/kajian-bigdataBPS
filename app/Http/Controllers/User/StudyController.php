<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Study;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\StudyDeletionRequest;
use Inertia\Inertia;


class StudyController extends Controller
{
    public function create()
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('User/Studies/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],

            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'excerpt' => [
                'required',
                'string',
                'max:500',
            ],

            'content' => [
                'required',
                'string',
            ],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'keywords' => [
                'nullable',
                'array',
                'max:7',
            ],

            'keywords.*' => [
                'required',
                'string',
                'min:2',
                'max:50',
            ],

            'submit_for_review' => [
                'nullable',
                'boolean',
            ],
        ]);

        $coverImage = null;

        if ($request->hasFile('cover_image')) {
            $coverImage = $request
                ->file('cover_image')
                ->store('studies/covers', 'public');
        }

        $study = Study::create([
            'user_id' => Auth::id(),
            'author_id' => Auth::id(),
            'category_id' => $validated['category_id'],

            'title' => $validated['title'],

            'slug' => Str::slug($validated['title'])
                . '-' . Str::random(6),

            'excerpt' => $validated['excerpt'],

            'cover_image' => $coverImage,

            'content' => $validated['content'],

            'status' => $request->boolean('submit_for_review')
                ? 'submitted'
                : 'draft',
        ]);

        $keywordIds = [];

        foreach ($validated['keywords'] ?? [] as $keywordName) {

            $keyword = \App\Models\Keyword::firstOrCreate(
                [
                    'slug' => Str::slug($keywordName),
                ],
                [
                    'name' => trim($keywordName),
                ]
            );

            $keywordIds[] = $keyword->id;
        }

        $study->keywords()->sync($keywordIds);

        if ($request->boolean('submit_for_review')) {
            return redirect()
                ->route('user.dashboard')
                ->with('success', 'Kajian berhasil diajukan untuk review.');
        }

        return redirect()
            ->route('user.studies.edit', $study)
            ->with('success', 'Kajian berhasil disimpan sebagai draft.');
    }

    public function submitReview(Study $study)
    {
        if ($study->user_id !== Auth::id()) {
            abort(403);
        }

        if ($study->status !== 'draft') {
            return back()->with(
                'error',
                'Kajian ini tidak dapat diajukan untuk review.'
            );
        }

        $study->update([
            'status' => 'submitted',
        ]);

        return redirect()
            ->route('user.dashboard')
            ->with(
                'success',
                'Kajian berhasil diajukan untuk review.'
            );
    }
    public function uploadContentImage(Request $request)
    {
        $validated = $request->validate([
            'image' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096',
            ],
        ]);

        $path = $request
            ->file('image')
            ->store('studies/content', 'public');

        return response()->json([
            'success' => true,
            'url' => '/storage/' . $path,
        ]);
    }

    public function edit(Study $study)
    {
        if ($study->user_id !== Auth::id()) {
            abort(403);
        }

        if (!in_array($study->status, ['draft', 'revision'])) {
            return redirect()
                ->route('user.dashboard')
                ->with(
                    'error',
                    'Kajian ini tidak dapat diedit pada status saat ini.'
                );
        }

        $categories = Category::orderBy('name')->get();

        $study->load([
            'category',
            'keywords',
            'reviews' => function ($query) {
                $query->latest();
            },
        ]);

        return Inertia::render('User/Studies/Edit', [
            'study' => $study,
            'categories' => $categories,
        ]);
    }
    public function update(Request $request, Study $study)
    {
        if ($study->user_id !== Auth::id()) {
            abort(403);
        }

        if (!in_array($study->status, ['draft', 'revision'])) {
            return redirect()
                ->route('user.dashboard')
                ->with(
                    'error',
                    'Kajian ini tidak dapat diperbarui pada status saat ini.'
                );
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],

            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'excerpt' => [
                'required',
                'string',
                'max:500',
            ],

            'content' => [
                'required',
                'string',
            ],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'keywords' => [
                'nullable',
                'array',
                'max:7',
            ],

            'keywords.*' => [
                'required',
                'string',
                'min:2',
                'max:50',
            ],
        ]);

        $study->title = $validated['title'];

        $study->category_id = $validated['category_id'];

        $study->excerpt = $validated['excerpt'];

        $study->content = $validated['content'];

        if ($request->hasFile('cover_image')) {

            $study->cover_image = $request
                ->file('cover_image')
                ->store('studies/covers', 'public');

        }

        $study->slug = Str::slug($validated['title'])
            . '-' . Str::random(6);

        $study->save();
        $keywordIds = [];

        foreach ($validated['keywords'] ?? [] as $keywordName) {

            $keyword = \App\Models\Keyword::firstOrCreate(
                [
                    'slug' => Str::slug($keywordName),
                ],
                [
                    'name' => trim($keywordName),
                ]
            );

            $keywordIds[] = $keyword->id;
        }

        $study->keywords()->sync($keywordIds);

        if ($request->boolean('submit_for_review')) {
            $study->update([
                'status' => 'submitted',
            ]);

            return redirect()
                ->route('user.dashboard')
                ->with(
                    'success',
                    'Kajian berhasil diajukan untuk review.'
                );
        }

        if ($request->boolean('submit_for_review')) {
            return redirect()
                ->route('user.dashboard')
                ->with(
                    'success',
                    'Kajian berhasil diajukan untuk review.'
                );
        }

        return redirect()
            ->route('user.dashboard')
            ->with(
                'success',
                'Kajian berhasil disimpan sebagai draft.'
            );
    }
    public function resubmit(Study $study)
    {
        if ($study->user_id !== Auth::id()) {
            abort(403);
        }

        if (!in_array($study->status, ['revision', 'draft'])) {
            return back()->with(
                'error',
                'Kajian tidak dapat diajukan kembali pada status saat ini.'
            );
        }

        $study->update([
            'status' => 'submitted',
        ]);

        return redirect()
            ->route('user.dashboard')
            ->with(
                'success',
                'Kajian berhasil diajukan kembali untuk review.'
            );
    }
    public function requestDeletion(Request $request, Study $study)
    {
        if ($study->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'reason' => [
                'required',
                'string',
                'max:2000',
            ],
        ]);

        $existingRequest = StudyDeletionRequest::where('study_id', $study->id)
            ->where('user_id', Auth::id())
            ->where('status', 'pending')
            ->exists();

        if ($existingRequest) {
            return back()->with(
                'error',
                'Permintaan penghapusan untuk kajian ini sedang diproses.'
            );
        }

        StudyDeletionRequest::create([
            'study_id' => $study->id,
            'user_id' => Auth::id(),
            'reason' => $validated['reason'],
            'status' => 'pending',
        ]);

        return redirect()
            ->route('user.dashboard')
            ->with(
                'success',
                'Permintaan penghapusan kajian berhasil diajukan ke Admin.'
            );
    }
    public function uploadContentImageForStudy(
        Request $request,
        Study $study
    ) {
        if ($study->user_id !== Auth::id()) {
            abort(403);
        }

        if (!in_array($study->status, ['draft', 'revision'])) {
            return response()->json([
                'success' => false,
                'message' => 'Kajian tidak dapat diedit pada status saat ini.',
            ], 403);
        }

        $validated = $request->validate([
            'image' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096',
            ],
        ]);

        $path = $request
            ->file('image')
            ->store('studies/content', 'public');

        return response()->json([
            'success' => true,
            'url' => '/storage/' . $path,
        ]);
    }
    public function uploadContentPdf(Request $request)
    {
        $validated = $request->validate([
            'pdf' => [
                'required',
                'file',
                'mimes:pdf',
                'max:10240',
            ],
        ]);

        $path = $request
            ->file('pdf')
            ->store('studies/content', 'public');

        return response()->json([
            'success' => true,
            'url' => '/storage/' . $path,
            'name' => $request->file('pdf')->getClientOriginalName(),
        ]);
    }

    public function uploadContentPdfForStudy(
        Request $request,
        Study $study
    ) {
        if ($study->user_id !== Auth::id()) {
            abort(403);
        }

        if (!in_array($study->status, ['draft', 'revision'])) {
            return response()->json([
                'success' => false,
                'message' => 'Kajian tidak dapat diedit pada status saat ini.',
            ], 403);
        }

        $validated = $request->validate([
            'pdf' => [
                'required',
                'file',
                'mimes:pdf',
                'max:10240',
            ],
        ]);

        $path = $request
            ->file('pdf')
            ->store('studies/content', 'public');

        return response()->json([
            'success' => true,
            'url' => '/storage/' . $path,
            'name' => $request->file('pdf')->getClientOriginalName(),
        ]);
    }
}