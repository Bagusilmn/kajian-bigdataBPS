<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->select('id', 'name', 'email', 'role', 'created_at')
            ->latest()
            ->get();
        $totalUsers = User::count();

        $totalResearchers = User::where('role', 'user')
            ->count();

        $totalReviewers = User::where('role', 'reviewer')
            ->count();

        $totalDirectors = User::where('role', 'director')
            ->count();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'totalUsers' => $totalUsers,
            'totalResearchers' => $totalResearchers,
            'totalReviewers' => $totalReviewers,
            'totalDirectors' => $totalDirectors,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'password' => ['required', 'string', 'min:8'],
            'role' => [
                'required',
                'in:user,reviewer,director,admin',
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | SINGLE ADMIN / DIRECTOR
        |--------------------------------------------------------------------------
        */

        if (
            in_array($validated['role'], ['admin', 'director'])
            && User::where('role', $validated['role'])->exists()
        ) {
            $roleLabel = $validated['role'] === 'admin'
                ? 'Admin'
                : 'Direktur';

            return back()
                ->withErrors([
                    'role' => "Akun {$roleLabel} sudah terdaftar. "
                        . "Hanya satu akun {$roleLabel} yang diperbolehkan.",
                ])
                ->withInput();
        }


        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()
            ->route('admin.users.index')
            ->with(
                'success',
                'Pengguna berhasil ditambahkan.'
            );
    }


    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email,' . $user->id,
            ],
            'role' => [
                'required',
                'in:user,reviewer,director,admin',
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | SINGLE ADMIN / DIRECTOR
        |--------------------------------------------------------------------------
        */

        if (
            in_array($validated['role'], ['admin', 'director'])
            && $user->role !== $validated['role']
        ) {
            $existingRoleUser = User::where(
                'role',
                $validated['role']
            )
                ->where('id', '!=', $user->id)
                ->exists();

            if ($existingRoleUser) {

                $roleLabel = $validated['role'] === 'admin'
                    ? 'Admin'
                    : 'Direktur';

                return back()
                    ->withErrors([
                        'role' => "Akun {$roleLabel} sudah terdaftar. "
                            . "Hanya satu akun {$roleLabel} yang diperbolehkan.",
                    ])
                    ->withInput();
            }
        }


        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
        ]);

        return redirect()
            ->route('admin.users.index')
            ->with(
                'success',
                'Data pengguna berhasil diperbarui.'
            );
    }


    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with(
                'error',
                'Admin tidak dapat menghapus akun sendiri.'
            );
        }


        /*
        |--------------------------------------------------------------------------
        | PROTECT SINGLE ADMIN / DIRECTOR
        |--------------------------------------------------------------------------
        */

        if (
            in_array($user->role, ['admin', 'director'])
            && User::where('role', $user->role)
                ->where('id', '!=', $user->id)
                ->doesntExist()
        ) {
            $roleLabel = $user->role === 'admin'
                ? 'Admin'
                : 'Direktur';

            return back()->with(
                'error',
                "Akun {$roleLabel} utama tidak dapat dihapus."
            );
        }


        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with(
                'success',
                'Pengguna berhasil dihapus.'
            );
    }
}