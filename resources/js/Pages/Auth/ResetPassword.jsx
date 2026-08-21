import { useForm } from '@inertiajs/react';
import BpsLogo from '../../Components/BpsLogo';

export default function ResetPassword({
    token,
    email,
}) {
    const form = useForm({
        token: token ?? '',
        email: email ?? '',
        password: '',
        password_confirmation: '',
    });

    function submit(event) {
        event.preventDefault();

        form.post('/reset-password');
    }

    return (
        <main className="auth-page-react">

            <div className="auth-container-react">

                <div className="auth-header-react">

                    <div className="auth-mark-react">
                        <BpsLogo />
                    </div>

                    <div className="auth-eyebrow">
                        KAJIAN BIG DATA BPS
                    </div>

                    <h1>
                        Reset Password
                    </h1>

                    <p>
                        Buat password baru untuk akunmu.
                    </p>

                </div>


                <div className="auth-card-react">

                    <form onSubmit={submit}>

                        <div className="auth-field-react">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={(event) =>
                                    form.setData(
                                        'email',
                                        event.target.value
                                    )
                                }
                                autoFocus
                                autoComplete="username"
                            />

                            {form.errors.email && (
                                <div className="auth-error">
                                    {form.errors.email}
                                </div>
                            )}

                        </div>


                        <div className="auth-field-react">

                            <label htmlFor="password">
                                Password Baru
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={form.data.password}
                                onChange={(event) =>
                                    form.setData(
                                        'password',
                                        event.target.value
                                    )
                                }
                                autoComplete="new-password"
                                placeholder="Masukkan password baru"
                            />

                            {form.errors.password && (
                                <div className="auth-error">
                                    {form.errors.password}
                                </div>
                            )}

                        </div>


                        <div className="auth-field-react">

                            <label htmlFor="password_confirmation">
                                Konfirmasi Password
                            </label>

                            <input
                                id="password_confirmation"
                                type="password"
                                value={
                                    form.data.password_confirmation
                                }
                                onChange={(event) =>
                                    form.setData(
                                        'password_confirmation',
                                        event.target.value
                                    )
                                }
                                autoComplete="new-password"
                                placeholder="Ulangi password baru"
                            />

                            {form.errors.password_confirmation && (
                                <div className="auth-error">
                                    {form.errors.password_confirmation}
                                </div>
                            )}

                        </div>


                        <button
                            type="submit"
                            className="auth-button-react"
                            disabled={form.processing}
                        >
                            {form.processing
                                ? 'Menyimpan...'
                                : 'Reset Password'}
                        </button>

                    </form>


                    <div className="auth-footer-react">

                        <a
                            href="/login"
                            className="auth-link-react"
                        >
                            Kembali ke Login
                        </a>

                    </div>

                </div>

            </div>

        </main>
    );
}   