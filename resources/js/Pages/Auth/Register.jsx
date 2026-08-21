import { useForm } from '@inertiajs/react';
import BpsLogo from '../../Components/BpsLogo';

export default function Register() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(event) {
        event.preventDefault();

        form.post('/register');
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
                        Buat Akun
                    </h1>

                    <p>
                        Daftar untuk mengakses platform
                        Kajian Big Data BPS
                    </p>

                </div>


                <div className="auth-card-react">

                    <form onSubmit={submit}>

                        <div className="auth-field-react">

                            <label htmlFor="name">
                                Nama
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData(
                                        'name',
                                        event.target.value
                                    )
                                }
                                autoFocus
                                autoComplete="name"
                                placeholder="Nama lengkap"
                            />

                            {form.errors.name && (
                                <div className="auth-error">
                                    {form.errors.name}
                                </div>
                            )}

                        </div>


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
                                autoComplete="new-password"
                                placeholder="Masukkan password"
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
                                placeholder="Ulangi password"
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
                                ? 'Mendaftarkan...'
                                : 'Daftar'}
                        </button>

                    </form>


                    <div className="auth-footer-react">

                        <span>
                            Sudah memiliki akun?
                        </span>

                        <a
                            href="/login"
                            className="auth-link-react"
                        >
                            Masuk
                        </a>

                    </div>

                </div>

            </div>

        </main>
    );
}