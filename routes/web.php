<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\Reviewer\DashboardController as ReviewerDashboardController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\StudyController as AdminStudyController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\StudyController;
use App\Http\Controllers\User\StudyController as UserStudyController;
use App\Http\Controllers\Reviewer\StudyController as ReviewerStudyController;
use App\Http\Controllers\Director\DashboardController as DirectorDashboardController;
use App\Http\Controllers\Director\StudyController as DirectorStudyController;
use App\Http\Controllers\SitemapController;

use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])
    ->name('home');
Route::get('/kajian', [StudyController::class, 'index'])
    ->name('studies.index');

Route::get('/kajian/{slug}', [StudyController::class, 'show'])
    ->name('studies.show');

Route::post('/kajian/{slug}/like', [StudyController::class, 'toggleLike'])
    ->name('studies.like');
Route::post('/kajian/{slug}/share', [StudyController::class, 'share'])
    ->name('studies.share');
Route::get('/sitemap.xml', SitemapController::class)
    ->name('sitemap');

/*
|--------------------------------------------------------------------------
| Default Dashboard
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\DashboardRedirectController;

Route::get('/dashboard', DashboardRedirectController::class)
    ->middleware('auth')
    ->name('dashboard');


/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
    Route::post(
        '/kajian/{slug}/comment',
        [StudyController::class, 'storeComment']
    )->name('studies.comment');
});

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:user'])
    ->prefix('user')
    ->name('user.')
    ->group(function () {

        Route::get('/dashboard', [UserDashboardController::class, 'index'])
            ->name('dashboard');
        Route::get('/studies/create', [UserStudyController::class, 'create'])
            ->name('studies.create');
        Route::post('/studies', [UserStudyController::class, 'store'])
            ->name('studies.store');
        Route::patch('/studies/{study}/submit-review', [UserStudyController::class, 'submitReview'])
            ->name('studies.submit-review');
        Route::post('/studies/content-image', [UserStudyController::class, 'uploadContentImage'])
            ->name('studies.content-image');   
        Route::get('/studies/{study}/edit', [UserStudyController::class, 'edit'])
            ->name('studies.edit');

        Route::patch('/studies/{study}', [UserStudyController::class, 'update'])
            ->name('studies.update');

        Route::patch('/studies/{study}/resubmit', [UserStudyController::class, 'resubmit'])
            ->name('studies.resubmit'); 
        Route::delete('/studies/{study}/deletion-request',[UserStudyController::class, 'requestDeletion'])
            ->name('studies.deletion-request');
        Route::get('/analytics', [UserDashboardController::class, 'analytics'])
            ->name('analytics');        
        Route::post(
            '/studies/{study}/content-image',
            [UserStudyController::class, 'uploadContentImageForStudy']
        )->name('studies.content-image.update');
    });




/*
|--------------------------------------------------------------------------
| Reviewer
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:reviewer'])
    ->prefix('reviewer')
    ->name('reviewer.')
    ->group(function () {

        Route::get('/dashboard', [ReviewerDashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/studies/active', [ReviewerDashboardController::class, 'activeStudies'])
            ->name('studies.active');

        Route::get('/studies/{study}', [ReviewerStudyController::class, 'show'])
            ->name('studies.show');

        Route::patch('/studies/{study}/start-review', [ReviewerStudyController::class, 'startReview'])
            ->name('studies.start-review');

        Route::patch('/studies/{study}/approve', [ReviewerStudyController::class, 'approve'])
            ->name('studies.approve');

        Route::patch('/studies/{study}/revision', [ReviewerStudyController::class, 'requestRevision'])
            ->name('studies.revision');

        Route::patch('/studies/{study}/reject', [ReviewerStudyController::class, 'reject'])
            ->name('studies.reject');

        Route::get('/analytics', [ReviewerDashboardController::class, 'analytics'])
            ->name('analytics');
    });


/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        // USERS

        Route::get('/users', [AdminUserController::class, 'index'])
            ->name('users.index');

        Route::post('/users', [AdminUserController::class, 'store'])
            ->name('users.store');

        Route::patch('/users/{user}', [AdminUserController::class, 'update'])
            ->name('users.update');

        Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])
            ->name('users.destroy');


        // CATEGORIES

        Route::get('/categories', [AdminCategoryController::class, 'index'])
            ->name('categories.index');

        Route::post('/categories', [AdminCategoryController::class, 'store'])
            ->name('categories.store');

        Route::patch('/categories/{category}', [AdminCategoryController::class, 'update'])
            ->name('categories.update');

        Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy'])
            ->name('categories.destroy');
        Route::get('/studies', [AdminStudyController::class, 'index'])
            ->name('studies.index');

        Route::patch(
            '/deletion-requests/{deletionRequest}/approve',
            [AdminStudyController::class, 'approveDeletion']
        )->name('deletion-requests.approve');

        Route::patch(
            '/deletion-requests/{deletionRequest}/reject',
            [AdminStudyController::class, 'rejectDeletion']
        )->name('deletion-requests.reject');
        
    });


Route::middleware(['auth', 'role:director'])->prefix('director')->name('director.')->group(function () {

    Route::get('/dashboard', [DirectorDashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/studies/{study}', [DirectorStudyController::class, 'show'])
        ->name('studies.show');

    Route::patch('/studies/{study}/approve', [DirectorStudyController::class, 'approve'])
        ->name('studies.approve');

    Route::patch('/studies/{study}/revision', [DirectorStudyController::class, 'requestRevision'])
        ->name('studies.revision');

    Route::patch('/studies/{study}/reject', [DirectorStudyController::class, 'reject'])
        ->name('studies.reject');
    Route::get('/analytics', [DirectorDashboardController::class, 'analytics'])
        ->name('analytics');
});


/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';