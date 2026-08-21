<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;

class DashboardRedirectController extends Controller
{
    public function __invoke(): RedirectResponse
    {
        $user = auth()->user();

        return match ($user->role) {
            'admin' => redirect()->route('admin.dashboard'),
            'reviewer' => redirect()->route('reviewer.dashboard'),
            'director' => redirect()->route('director.dashboard'),
            'user' => redirect()->route('user.dashboard'),

            default => abort(403),
        };
    }
}