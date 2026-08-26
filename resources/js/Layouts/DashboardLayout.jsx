import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

import Sidebar from '../Components/Sidebar';

export default function DashboardLayout({ children }) {

    const { flash } = usePage().props;
    const [toast, setToast] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

                    <button
                        type="button"
                        className="dashboard-mobile-menu"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Buka menu"
                    >
                        ☰
                    </button>

                    <span>
                        Dashboard
                    </span>

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