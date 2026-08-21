import BpsLogo from './BpsLogo';
export default function Footer() {
    return (
        <footer className="site-footer">

            <div className="site-footer__inner">

                <div className="site-footer__brand">

                    <span className="site-brand__mark">
                        <BpsLogo />
                    </span>

                    <div>

                        <strong>
                            KAJIAN BIG DATA BPS
                        </strong>

                        <p>
                            Platform kajian dan eksplorasi
                            pemanfaatan Big Data untuk mendukung
                            statistik resmi.
                        </p>

                    </div>

                </div>


                <div className="site-footer__links">

                    <div>

                        <span className="site-footer__heading">
                            NAVIGASI
                        </span>

                        <a href="/">
                            Beranda
                        </a>

                        <a href="/kajian">
                            Kajian
                        </a>

                        <a href="/#topics">
                            Topik
                        </a>

                    </div>


                    <div>

                        <span className="site-footer__heading">
                            PLATFORM
                        </span>

                        <a href="/login">
                            Masuk
                        </a>

                        <a href="/register">
                            Daftar
                        </a>

                    </div>

                </div>

            </div>


            <div className="site-footer__bottom">

                <div>
                    © {new Date().getFullYear()} Badan Pusat Statistik
                </div>

                <div>
                    Kajian Big Data BPS
                </div>

            </div>

        </footer>
    );
}