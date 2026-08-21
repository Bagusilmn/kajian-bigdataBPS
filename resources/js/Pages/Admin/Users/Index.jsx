import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '../../../Layouts/DashboardLayout';

export default function Index({
    users = [],
    totalUsers = 0,
    totalResearchers = 0,
    totalReviewers = 0,
    totalDirectors = 0,
}) {
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const form = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    function openCreate() {
        setEditingUser(null);

        form.reset();
        form.setData({
            name: '',
            email: '',
            password: '',
            role: 'user',
        });

        setShowForm(true);
    }

    function openEdit(user) {
        setEditingUser(user);

        form.setData({
            name: user.name ?? '',
            email: user.email ?? '',
            password: '',
            role: user.role ?? 'user',
        });

        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditingUser(null);
        form.reset();
        form.clearErrors();
    }

    function submit(event) {
        event.preventDefault();

        if (editingUser) {
            form.patch(`/admin/users/${editingUser.id}`, {
                onSuccess: () => closeForm(),
            });

            return;
        }

        form.post('/admin/users', {
            onSuccess: () => closeForm(),
        });
    }

    function deleteUser(user) {
        if (
            !window.confirm(
                `Hapus pengguna "${user.name}"? Tindakan ini tidak dapat dibatalkan.`
            )
        ) {
            return;
        }

        form.delete(`/admin/users/${user.id}`);
    }

    return (
        <DashboardLayout>

            <div className="admin-dashboard">

                <div className="admin-header">

                    <div>
                        <div className="dashboard-eyebrow">
                            USER MANAGEMENT
                        </div>

                        <h1>
                            Pengguna
                        </h1>

                        <p>
                            Kelola akun, peran, dan akses pengguna
                            pada platform Kajian Big Data BPS.
                        </p>
                    </div>


                    <button
                        type="button"
                        className="dashboard-primary-button"
                        onClick={openCreate}
                    >
                        + Tambah Pengguna
                    </button>

                </div>

                <div className="admin-stats">

                    <div className="admin-stat-card">
                        <span>
                            TOTAL USERS
                        </span>

                        <strong>
                            {totalUsers}
                        </strong>

                        <small>
                            Semua akun
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            PENELITI
                        </span>

                        <strong>
                            {totalResearchers}
                        </strong>

                        <small>
                            Pengguna peneliti
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            REVIEWER
                        </span>

                        <strong>
                            {totalReviewers}
                        </strong>

                        <small>
                            Reviewer aktif
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            DIREKTUR
                        </span>

                        <strong>
                            {totalDirectors}
                        </strong>

                        <small>
                            Reviewer final
                        </small>
                    </div>

                </div>
                <section className="admin-section">

                    <div className="admin-section__heading">

                        <div>
                            <div className="dashboard-eyebrow">
                                DAFTAR PENGGUNA
                            </div>

                            <h2>
                                Semua Pengguna
                            </h2>
                        </div>

                        <span className="admin-queue-count">
                            {users.length} pengguna
                        </span>

                    </div>


                    <div className="admin-user-table-wrapper">

                        <table className="admin-user-table">

                            <thead>
                                <tr>
                                    <th>
                                        Nama
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Bergabung
                                    </th>

                                    <th>
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {users.length > 0 ? (

                                    users.map((user) => (

                                        <tr key={user.id}>

                                            <td>
                                                <strong>
                                                    {user.name}
                                                </strong>
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                <span
                                                    className={`admin-role-badge admin-role-badge--${user.role}`}
                                                >
                                                    {user.role === 'user'
                                                        ? 'Peneliti'
                                                        : user.role === 'reviewer'
                                                            ? 'Reviewer'
                                                            : user.role === 'director'
                                                                ? 'Direktur'
                                                                : 'Admin'}
                                                </span>
                                            </td>

                                            <td>
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleDateString(
                                                    'id-ID',
                                                    {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }
                                                )}
                                            </td>

                                            <td>

                                                <div className="admin-user-actions">

                                                    <button
                                                        type="button"
                                                        className="admin-table-button"
                                                        onClick={() =>
                                                            openEdit(user)
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="admin-table-button admin-table-button--danger"
                                                        onClick={() =>
                                                            deleteUser(user)
                                                        }
                                                    >
                                                        Hapus
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="admin-table-empty"
                                        >
                                            Belum ada pengguna.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>


                {showForm && (

                    <div className="admin-modal-backdrop">

                        <div className="admin-modal">

                            <div className="admin-modal__header">

                                <div>

                                    <div className="dashboard-eyebrow">
                                        {editingUser
                                            ? 'EDIT USER'
                                            : 'NEW USER'}
                                    </div>

                                    <h2>
                                        {editingUser
                                            ? 'Edit Pengguna'
                                            : 'Tambah Pengguna'}
                                    </h2>

                                </div>


                                <button
                                    type="button"
                                    className="admin-modal__close"
                                    onClick={closeForm}
                                >
                                    ×
                                </button>

                            </div>


                            <form
                                onSubmit={submit}
                                className="admin-form"
                            >

                                <div className="admin-form-field">

                                    <label>
                                        Nama
                                    </label>

                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(event) =>
                                            form.setData(
                                                'name',
                                                event.target.value
                                            )
                                        }
                                        placeholder="Nama lengkap"
                                    />

                                    {form.errors.name && (
                                        <div className="form-error">
                                            {form.errors.name}
                                        </div>
                                    )}

                                </div>


                                <div className="admin-form-field">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={form.data.email}
                                        onChange={(event) =>
                                            form.setData(
                                                'email',
                                                event.target.value
                                            )
                                        }
                                        placeholder="nama@email.com"
                                    />

                                    {form.errors.email && (
                                        <div className="form-error">
                                            {form.errors.email}
                                        </div>
                                    )}

                                </div>


                                {!editingUser && (

                                    <div className="admin-form-field">

                                        <label>
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            value={form.data.password}
                                            onChange={(event) =>
                                                form.setData(
                                                    'password',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Minimal 8 karakter"
                                        />

                                        {form.errors.password && (
                                            <div className="form-error">
                                                {form.errors.password}
                                            </div>
                                        )}

                                    </div>

                                )}


                                <div className="admin-form-field">

                                    <label>
                                        Role
                                    </label>

                                    <select
                                        value={form.data.role}
                                        onChange={(event) =>
                                            form.setData(
                                                'role',
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="user">
                                            Peneliti
                                        </option>

                                        <option value="reviewer">
                                            Reviewer
                                        </option>

                                        <option value="director">
                                            Direktur
                                        </option>

                                        <option value="admin">
                                            Administrator
                                        </option>
                                    </select>

                                    {form.errors.role && (
                                        <div className="form-error">
                                            {form.errors.role}
                                        </div>
                                    )}

                                </div>


                                <div className="admin-modal__actions">

                                    <button
                                        type="button"
                                        className="admin-table-button"
                                        onClick={closeForm}
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="dashboard-primary-button"
                                        disabled={form.processing}
                                    >
                                        {form.processing
                                            ? 'Menyimpan...'
                                            : editingUser
                                                ? 'Simpan Perubahan'
                                                : 'Tambah Pengguna'}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}