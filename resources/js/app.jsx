import React from 'react';
import './bootstrap';
// import '../css/react.css';

import { createRoot } from 'react-dom/client';
import { FeedbackProvider } from './Components/FeedbackProvider';
import { LanguageProvider } from './Contexts/LanguageContext';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),

    setup({ el, App, props }) {
        createRoot(el).render(
            <LanguageProvider>
                <FeedbackProvider>
                    <App {...props} />
                </FeedbackProvider>
            </LanguageProvider>
        );
    },

    progress: {
        color: '#2f80c0',
    },
});