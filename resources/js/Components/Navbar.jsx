import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import BpsLogo from './BpsLogo';
import { useLanguage } from '../Contexts/LanguageContext';

export default function Navbar() {
    const { auth } = usePage().props;

    const user = auth?.user;

    const [showProfile, setShowProfile] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const roleLabel = {
        id: {
            user: 'Peneliti',
            reviewer: 'Reviewer',
            director: 'Direktur',
            admin: 'Administrator',
        },

        en: {
            user: 'Researcher',
            reviewer: 'Reviewer',
            director: 'Director',
            admin: 'Administrator',
        },
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <nav className="site-navbar">

            <div className="site-navbar__inner">

                <a
                    href="/"
                    className="site-brand"
                >

                    <span className="site-brand__mark">
                        <BpsLogo />
                    </span>

                    <span className="site-brand__text">

                        <strong>
                            KAJIAN BIG DATA BPS
                        </strong>

                        <small>
                            Badan Pusat Statistik
                        </small>

                    </span>

                </a>


                <div className="site-nav">

                    <a href="/">
                        {t.nav.home}
                    </a>

                    <a href="/kajian">
                        {t.nav.studies}
                    </a>

                    <a href="/#topics">
                        {t.nav.topics}
                    </a>

                    <div className="site-language" aria-label="Language selector">
                        <button
                            type="button"
                            className={`site-language__option ${
                                language === 'id'
                                    ? 'site-language__option--active'
                                    : ''
                            }`}
                            onClick={() => setLanguage('id')}
                            aria-pressed={language === 'id'}
                        >
                            {/* <span className="site-language__flag">🇮🇩</span> */}
                            <span>ID</span>
                        </button>

                        <button
                            type="button"
                            className={`site-language__option ${
                                language === 'en'
                                    ? 'site-language__option--active'
                                    : ''
                            }`}
                            onClick={() => setLanguage('en')}
                            aria-pressed={language === 'en'}
                        >
                            {/* <span className="site-language__flag">🇬🇧</span> */}
                            <span>EN</span>
                        </button>
                    </div>

                    {user && (

                        <div className="site-profile">

                            <button
                                type="button"
                                className="site-profile__button"
                                onClick={() =>
                                    setShowProfile(!showProfile)
                                }
                            >

                                <span className="site-profile__avatar">
                                    {user.name
                                        ?.charAt(0)
                                        ?.toUpperCase() ?? 'U'}
                                </span>

                                <span className="site-profile__info">

                                    <strong>
                                        {user.name}
                                    </strong>

                                    <small>
                                        {roleLabel[language][user.role] ??
                                            t.role.default}
                                    </small>

                                </span>

                                <span className="site-profile__arrow">
                                    {showProfile ? '▲' : '▼'}
                                </span>

                            </button>

                            {showProfile && (

                                <div className="site-profile__dropdown">

                                    <div className="site-profile__dropdown-header">

                                        <strong>
                                            {user.name}
                                        </strong>

                                        <span>
                                            {roleLabel[language][user.role] ??
                                                t.role.default}
                                        </span>

                                    </div>

                                    <div className="site-profile__dropdown-divider" />

                                    <a
                                        href="/dashboard"
                                        className="site-profile__dropdown-item"
                                    >
                                        Dashboard
                                    </a>

                                    <a
                                        href="/profile"
                                        className="site-profile__dropdown-item"
                                    >
                                        Profil
                                    </a>

                                    <div className="site-profile__dropdown-divider" />

                                    <button
                                        type="button"
                                        className="site-profile__dropdown-item site-profile__dropdown-item--logout"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                </div>

                            )}

                        </div>

                    )}

                </div>

            </div>

        </nav>
    );
}