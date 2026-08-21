import { useForm } from '@inertiajs/react';
import BpsLogo from '../../Components/BpsLogo';

export default function ForgotPassword({ status }) {
    const form = useForm({
        email: '',
    });

    function submit(event) {
        event.preventDefault();

        form.post('/forgot-password');
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
                        Lupa Password?
                    </h1>

                    <p>
                        Kami akan mengirimkan link untuk
                        mengatur ulang password akunmu.
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


                        <button
                            type="submit"
                            className="auth-button-react"
                            disabled={form.processing}
                        >
                            {form.processing
                                ? 'Mengirim...'
                                : 'Kirim Link Reset'}
                        </button>

                    </form>


                    <div className="auth-footer-react">

                        <span>
                            Ingat password?
                        </span>

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