import BpsLogo from '../../Components/BpsLogo';
import { useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const form = useForm({
        password: '',
    });

    function submit(event) {
        event.preventDefault();

        form.post('/confirm-password');
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
                        Konfirmasi Password
                    </h1>

                    <p>
                        Verifikasi password sebelum
                        melanjutkan ke area aman.
                    </p>

                </div>


                <div className="auth-card-react">

                    <div className="auth-description">
                        Ini adalah area aman aplikasi.
                        Silakan konfirmasi password kamu
                        sebelum melanjutkan.
                    </div>


                    <form onSubmit={submit}>

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
                                autoFocus
                                autoComplete="current-password"
                                placeholder="Masukkan password"
                            />

                            {form.errors.password && (
                                <div className="auth-error">
                                    {form.errors.password}
                                </div>
                            )}

                        </div>


                        <button
                            type="submit"
                            className="auth-button-react"
                            disabled={form.processing}
                        >
                            {form.processing
                                ? 'Memverifikasi...'
                                : 'Konfirmasi'}
                        </button>

                    </form>

                </div>

            </div>

        </main>
    );
}