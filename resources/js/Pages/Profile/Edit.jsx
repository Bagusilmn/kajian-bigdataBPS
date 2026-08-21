import { useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';

export default function Edit({ user }) {
    const { flash } = usePage().props;

    const profileForm = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({
        password: '',
    });

    function updateProfile(event) {
        event.preventDefault();

        profileForm.patch('/profile');
    }

    function updatePassword(event) {
        event.preventDefault();

        passwordForm.put('/password', {
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    }

    function deleteAccount(event) {
        event.preventDefault();

        if (
            !window.confirm(
                'Apakah kamu yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.'
            )
        ) {
            return;
        }

        deleteForm.delete('/profile', {
            onSuccess: () => {
                //
                // Redirect ditangani Laravel
                //
            },
        });
    }

    return (
        <DashboardLayout>

            <div className="profile-page">

                <div className="profile-header">

                    <div className="dashboard-eyebrow">
                        ACCOUNT SETTINGS
                    </div>

                    <h1>
                        Profile
                    </h1>

                    <p>
                        Kelola informasi akun dan keamanan
                        profil kamu.
                    </p>

                </div>


                {flash?.status === 'profile-updated' && (
                    <div className="profile-success">
                        Informasi profil berhasil diperbarui.
                    </div>
                )}


                {/* PROFILE INFORMATION */}

                <section className="profile-card">

                    <div className="profile-card__heading">

                        <div>
                            <h2>
                                Informasi Profil
                            </h2>

                            <p>
                                Perbarui nama dan alamat email akun.
                            </p>
                        </div>

                    </div>


                    <form
                        onSubmit={updateProfile}
                        className="profile-form"
                    >

                        <div className="profile-field">

                            <label htmlFor="name">
                                Nama
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={profileForm.data.name}
                                onChange={(event) =>
                                    profileForm.setData(
                                        'name',
                                        event.target.value
                                    )
                                }
                            />

                            {profileForm.errors.name && (
                                <div className="form-error">
                                    {profileForm.errors.name}
                                </div>
                            )}

                        </div>


                        <div className="profile-field">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={profileForm.data.email}
                                onChange={(event) =>
                                    profileForm.setData(
                                        'email',
                                        event.target.value
                                    )
                                }
                            />

                            {profileForm.errors.email && (
                                <div className="form-error">
                                    {profileForm.errors.email}
                                </div>
                            )}

                        </div>


                        <button
                            type="submit"
                            className="dashboard-primary-button"
                            disabled={profileForm.processing}
                        >
                            {profileForm.processing
                                ? 'Menyimpan...'
                                : 'Simpan Perubahan'}
                        </button>

                    </form>

                </section>


                {/* PASSWORD */}

                <section className="profile-card">

                    <div className="profile-card__heading">

                        <div>
                            <h2>
                                Ubah Password
                            </h2>

                            <p>
                                Gunakan password yang kuat untuk
                                menjaga keamanan akun.
                            </p>
                        </div>

                    </div>


                    <form
                        onSubmit={updatePassword}
                        className="profile-form"
                    >

                        <div className="profile-field">

                            <label htmlFor="current_password">
                                Password Saat Ini
                            </label>

                            <input
                                id="current_password"
                                type="password"
                                value={
                                    passwordForm.data.current_password
                                }
                                onChange={(event) =>
                                    passwordForm.setData(
                                        'current_password',
                                        event.target.value
                                    )
                                }
                            />

                            {passwordForm.errors.current_password && (
                                <div className="form-error">
                                    {passwordForm.errors.current_password}
                                </div>
                            )}

                        </div>


                        <div className="profile-field">

                            <label htmlFor="password">
                                Password Baru
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={
                                    passwordForm.data.password
                                }
                                onChange={(event) =>
                                    passwordForm.setData(
                                        'password',
                                        event.target.value
                                    )
                                }
                            />

                            {passwordForm.errors.password && (
                                <div className="form-error">
                                    {passwordForm.errors.password}
                                </div>
                            )}

                        </div>


                        <div className="profile-field">

                            <label htmlFor="password_confirmation">
                                Konfirmasi Password
                            </label>

                            <input
                                id="password_confirmation"
                                type="password"
                                value={
                                    passwordForm.data.password_confirmation
                                }
                                onChange={(event) =>
                                    passwordForm.setData(
                                        'password_confirmation',
                                        event.target.value
                                    )
                                }
                            />

                            {passwordForm.errors.password_confirmation && (
                                <div className="form-error">
                                    {passwordForm.errors.password_confirmation}
                                </div>
                            )}

                        </div>


                        <button
                            type="submit"
                            className="dashboard-primary-button"
                            disabled={passwordForm.processing}
                        >
                            {passwordForm.processing
                                ? 'Memperbarui...'
                                : 'Ubah Password'}
                        </button>

                    </form>

                </section>


                {/* DELETE ACCOUNT */}

                <section className="profile-card profile-card--danger">

                    <div className="profile-card__heading">

                        <div>
                            <h2>
                                Hapus Akun
                            </h2>

                            <p>
                                Penghapusan akun bersifat permanen
                                dan tidak dapat dibatalkan.
                            </p>
                        </div>

                    </div>


                    <form
                        onSubmit={deleteAccount}
                        className="profile-form"
                    >

                        <div className="profile-field">

                            <label htmlFor="delete_password">
                                Password
                            </label>

                            <input
                                id="delete_password"
                                type="password"
                                value={
                                    deleteForm.data.password
                                }
                                onChange={(event) =>
                                    deleteForm.setData(
                                        'password',
                                        event.target.value
                                    )
                                }
                                placeholder="Konfirmasi dengan password"
                            />

                            {deleteForm.errors.password && (
                                <div className="form-error">
                                    {deleteForm.errors.password}
                                </div>
                            )}

                        </div>


                        <button
                            type="submit"
                            className="profile-danger-button"
                            disabled={deleteForm.processing}
                        >
                            {deleteForm.processing
                                ? 'Menghapus...'
                                : 'Hapus Akun'}
                        </button>

                    </form>

                </section>

            </div>

        </DashboardLayout>
    );
}