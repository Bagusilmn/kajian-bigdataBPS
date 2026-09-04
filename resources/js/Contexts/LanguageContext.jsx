import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'id';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = translations[language];

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            'useLanguage harus digunakan di dalam LanguageProvider'
        );
    }

    return context;
}