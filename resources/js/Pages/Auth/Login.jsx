import { useForm } from '@inertiajs/react';
import BpsLogo from '../../Components/BpsLogo';

export default function Login({
    canResetPassword,
    status,
}) {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(event) {
        event.preventDefault();

        form.post('/login');
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
                        Masuk
                    </h1>

                    <p>
                        Akses platform Kajian Big Data BPS
                    </p>

                </div>


                <div className="auth-card-react">

                    {status && (
                        <div className="auth-status">
                            {status}
                        </div>
                    )}


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
                                placeholder="nama@email.com"
                            />

                            {form.errors.email && (
                                <div className="auth-error">
                                    {form.errors.email}
                                </div>
                            )}

                        </div>


                        <div className="auth-field-react">

                            <label htmlFor="password">
                                Password
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
                                autoComplete="current-password"
                                placeholder="Masukkan password"
                            />

                            {form.errors.password && (
                                <div className="auth-error">
                                    {form.errors.password}
                                </div>
                            )}

                        </div>


                        <div className="auth-options-react">

                            <label>

                                <input
                                    type="checkbox"
                                    checked={form.data.remember}
                                    onChange={(event) =>
                                        form.setData(
                                            'remember',
                                            event.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Ingat saya
                                </span>

                            </label>


                            {canResetPassword && (
                                <a
                                    href="/forgot-password"
                                    className="auth-link-react"
                                >
                                    Lupa password?
                                </a>
                            )}

                        </div>


                        <button
                            type="submit"
                            className="auth-button-react"
                            disabled={form.processing}
                        >
                            {form.processing
                                ? 'Memproses...'
                                : 'Masuk'}
                        </button>

                    </form>


                    <div className="auth-footer-react">

                        <span>
                            Belum memiliki akun?
                        </span>

                        <a
                            href="/register"
                            className="auth-link-react"
                        >
                            Daftar
                        </a>

                    </div>

                </div>

            </div>

        </main>
    );
}