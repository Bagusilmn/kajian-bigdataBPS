import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import BpsLogo from './BpsLogo';

export default function Sidebar({ isOpen = false, onClose }) {
    const { auth } = usePage().props;
    const currentUrl = usePage().url;

    const user = auth?.user;
    const role = user?.role ?? 'user';

    const menus = {
        user: [
            {
                label: 'Dashboard',
                href: '/user/dashboard',
            },
            {
                label: 'Analytics',
                href: '/user/analytics',
            },
            {
                label: 'Ajukan Kajian',
                href: '/user/studies/create',
            },
        ],

        reviewer: [
            {
                label: 'Dashboard',
                href: '/reviewer/dashboard',
            },
            {
                label: 'Sedang Direview',
                href: '/reviewer/studies/active',
            },
            {
                label: 'Analytics',
                href: '/reviewer/analytics',
            },
        ],

        admin: [
            {
                label: 'Dashboard',
                href: '/admin/dashboard',
            },
            {
                label: 'Pengguna',
                href: '/admin/users',
            },
            {
                label: 'Kategori',
                href: '/admin/categories',
            },
            {
                label: 'Kelola Kajian',
                href: '/admin/studies',
            },
        ],

        director: [
            {
                label: 'Dashboard',
                href: '/director/dashboard',
            },
            {
                label: 'Analytics',
                href: '/director/analytics',
            },
        ],
    };

    const currentMenus = menus[role] ?? menus.user;

    const roleLabel = {
        user: 'Peneliti',
        reviewer: 'Reviewer',
        director: 'Direktur',
        admin: 'Administrator',
    };

    const handleNavigation = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <>
            {/* Overlay khusus mobile */}
            {isOpen && (
                <button
                    type="button"
                    className="dashboard-sidebar__overlay"
                    onClick={onClose}
                    aria-label="Tutup menu"
                />
            )}

            <aside
                className={`dashboard-sidebar ${
                    isOpen ? 'is-open' : ''
                }`}
            >

                {/* Header sidebar */}
                <div className="dashboard-sidebar__header">

                    <a
                        href="/"
                        className="dashboard-brand"
                        onClick={handleNavigation}
                    >

                        <span
                            className="dashboard-brand__mark"
                            style={{
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                overflow: 'hidden',
                            }}
                        >
                            <BpsLogo />
                        </span>

                        <span className="dashboard-brand__text">
                            <strong>
                                KAJIAN BIG DATA BPS
                            </strong>

                            <small>
                                {roleLabel[role] ?? 'Portal Kajian'}
                            </small>
                        </span>

                    </a>

                    {/* Tombol close mobile */}
                    <button
                        type="button"
                        className="dashboard-sidebar__close"
                        onClick={onClose}
                        aria-label="Tutup menu"
                    >
                        ×
                    </button>

                </div>


                <nav className="dashboard-nav">

                    {currentMenus.map((menu) => {

                        const isActive =
                            currentUrl === menu.href ||
                            currentUrl.startsWith(`${menu.href}/`);

                        return (
                            <a
                                key={menu.label}
                                href={menu.href}
                                className={`dashboard-nav__link ${
                                    isActive ? 'is-active' : ''
                                }`}
                                onClick={handleNavigation}
                            >
                                {menu.label}
                            </a>
                        );
                    })}

                </nav>


                <div className="dashboard-sidebar__bottom">

                    <a
                        href="/profile"
                        className="dashboard-nav__link"
                        onClick={handleNavigation}
                    >
                        Profil
                    </a>

                    <button
                        type="button"
                        className="dashboard-logout"
                        onClick={() => {
                            if (onClose) {
                                onClose();
                            }

                            router.post('/logout');
                        }}
                    >
                        <span className="dashboard-logout__icon">
                            ↪
                        </span>

                        <span>
                            Logout
                        </span>
                    </button>

                </div>

            </aside>
        </>
    );
}