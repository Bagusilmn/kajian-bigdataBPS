import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

import Sidebar from '../Components/Sidebar';

export default function DashboardLayout({ children }) {

    const { flash, url } = usePage().props;

    const [toast, setToast] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Page Title
    |--------------------------------------------------------------------------
    */

    const getPageTitle = (currentUrl) => {

        const path = currentUrl?.split('?')[0] ?? '';

        const pageTitles = {

            // ADMIN
            '/admin/dashboard': 'Dashboard',
            '/admin/users': 'Pengguna',
            '/admin/categories': 'Kategori',
            '/admin/studies': 'Kelola Kajian',

            // REVIEWER
            '/reviewer/dashboard': 'Dashboard',
            '/reviewer/studies/active': 'Sedang Direview',
            '/reviewer/analytics': 'Analytics',

            // DIRECTOR
            '/director/dashboard': 'Dashboard',
            '/director/analytics': 'Analytics',

            // USER / PENELITI
            '/user/dashboard': 'Dashboard',
            '/user/analytics': 'Analytics',
            '/user/studies/create': 'Ajukan Kajian',
        };

        if (pageTitles[path]) {
            return pageTitles[path];
        }

        /*
         * Untuk halaman yang memiliki parameter / ID,
         * gunakan fallback berdasarkan prefix.
         */

        if (path.startsWith('/admin/users/')) {
            return 'Pengguna';
        }

        if (path.startsWith('/admin/categories/')) {
            return 'Kategori';
        }

        if (path.startsWith('/admin/studies/')) {
            return 'Kelola Kajian';
        }

        if (path.startsWith('/reviewer/studies/')) {
            return 'Sedang Direview';
        }

        if (path.startsWith('/user/studies/')) {
            return 'Kajian';
        }

        return 'Dashboard';
    };

    const pageTitle = getPageTitle(url);


    /*
    |--------------------------------------------------------------------------
    | Flash Toast
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const message =
            flash?.success ||
            flash?.error ||
            flash?.warning ||
            flash?.info;

        if (!message) {
            return;
        }

        const type =
            flash.success ? 'success' :
            flash.error ? 'error' :
            flash.warning ? 'warning' :
            'info';

        setToast({
            message,
            type,
        });

        const timer = setTimeout(() => {
            setToast(null);
        }, 3500);

        return () => clearTimeout(timer);

    }, [
        flash?.success,
        flash?.error,
        flash?.warning,
        flash?.info,
    ]);


    return (
        <div className="dashboard-shell">

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="dashboard-main">

                <header className="dashboard-topbar">

                    <span>
                        {pageTitle}
                    </span>

                    <button
                        type="button"
                        className="dashboard-mobile-menu"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Buka menu"
                    >
                        ☰
                    </button>

                </header>


                <main className="dashboard-page">
                    {children}
                </main>

            </div>


            {toast && (

                <div
                    className={`dashboard-toast dashboard-toast--${toast.type}`}
                    role="status"
                >

                    <span className="dashboard-toast__icon">

                        {toast.type === 'success' && '✓'}
                        {toast.type === 'error' && '×'}
                        {toast.type === 'warning' && '!'}
                        {toast.type === 'info' && 'i'}

                    </span>

                    <span className="dashboard-toast__message">
                        {toast.message}
                    </span>

                    <button
                        type="button"
                        className="dashboard-toast__close"
                        onClick={() => setToast(null)}
                        aria-label="Tutup"
                    >
                        ×
                    </button>

                </div>

            )}

        </div>
    );
}