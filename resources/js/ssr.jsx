import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { renderToString } from 'react-dom/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LanguageProvider } from './Contexts/LanguageContext';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,

        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.jsx`,
                import.meta.glob('./Pages/**/*.jsx')
            ),

        setup: ({ App, props }) =>
            <LanguageProvider>
                <App {...props} />
            </LanguageProvider>,
    })
);
