import { router, usePage } from '@inertiajs/react';
import BpsLogo from './BpsLogo';

export default function Sidebar() {
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

    return (
        <aside className="dashboard-sidebar">

            <a
                href="/"
                className="dashboard-brand"
            >

                <span className="dashboard-brand__mark">
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
                >
                    Profil
                </a>

                <button
                    type="button"
                    className="dashboard-logout"
                    onClick={() => router.post('/logout')}
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
    );
}