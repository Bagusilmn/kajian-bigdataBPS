import { useForm } from '@inertiajs/react';
import BpsLogo from '../../Components/BpsLogo';

export default function VerifyEmail({ status }) {
    const verificationForm = useForm({});
    const logoutForm = useForm({});

    function resendVerification() {
        verificationForm.post('/email/verification-notification');
    }

    function logout(event) {
        event.preventDefault();

        logoutForm.post('/logout');
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
                        Verifikasi Email
                    </h1>

                    <p>
                        Satu langkah lagi sebelum masuk ke platform.
                    </p>

                </div>


                <div className="auth-card-react">

                    <div className="auth-description">
                        Terima kasih telah mendaftar. Silakan
                        verifikasi alamat email dengan mengklik
                        tautan yang telah kami kirimkan.
                    </div>


                    {status === 'verification-link-sent' && (

                        <div className="auth-status">
                            Tautan verifikasi baru telah dikirim
                            ke alamat email yang kamu gunakan saat
                            mendaftar.
                        </div>

                    )}


                    <button
                        type="button"
                        className="auth-button-react"
                        onClick={resendVerification}
                        disabled={verificationForm.processing}
                    >
                        {verificationForm.processing
                            ? 'Mengirim...'
                            : 'Kirim Ulang Email Verifikasi'}
                    </button>


                    <form onSubmit={logout}>

                        <button
                            type="submit"
                            className="auth-logout-link"
                            disabled={logoutForm.processing}
                        >
                            Keluar
                        </button>

                    </form>

                </div>

            </div>

        </main>
    );
}