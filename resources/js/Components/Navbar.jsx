import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import BpsLogo from './BpsLogo';

export default function Navbar() {
    const { auth } = usePage().props;

    const user = auth?.user;

    const [showProfile, setShowProfile] = useState(false);

    const roleLabel = {
        user: 'Peneliti',
        reviewer: 'Reviewer',
        director: 'Direktur',
        admin: 'Administrator',
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
                        Beranda
                    </a>    

                    <a href="/kajian">
                        Kajian
                    </a>

                    <a href="/#topics">
                        Topik
                    </a>


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
                                        {roleLabel[user.role] ??
                                            'Pengguna'}
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
                                            {roleLabel[user.role] ??
                                                'Pengguna'}
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