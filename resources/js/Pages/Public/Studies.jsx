import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import StudyCard from '../../Components/StudyCard';
import { useLanguage } from '../../Contexts/LanguageContext';

export default function Studies({
    studies,
    categories,
    filters,
}) {
    const { t } = useLanguage();
    const hasFilter =
        Boolean(filters?.search) ||
        Boolean(filters?.category);

    const pageTitle = hasFilter
        ? `Hasil Pencarian Kajian Big Data | Kajian Big Data BPS`
        : `Kajian Big Data | Kajian Big Data BPS`;

    const pageDescription = hasFilter
        ? `Temukan kajian Big Data BPS berdasarkan kata kunci dan kategori yang relevan.`
        : `Jelajahi kajian, analisis, metode, dan pemanfaatan Big Data dalam mendukung statistik resmi di Badan Pusat Statistik.`;

    const canonicalUrl =
        typeof window !== 'undefined'
            ? `${window.location.origin}/kajian`
            : '/kajian';
    const [search, setSearch] = useState(filters?.search ?? '');
    const [category, setCategory] = useState(filters?.category ?? '');
    const handleSearch = () => {
        router.get(
            '/kajian',
            {
                search: search || undefined,
                category: category || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleReset = () => {

        setSearch('');
        setCategory('');

        router.get(
            '/kajian',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentSearch = filters?.search ?? '';
            const currentCategory = filters?.category ?? '';

            if (
                search === currentSearch &&
                category === currentCategory
            ) {
                return;
            }

            handleSearch();
        }, 350);

        return () => clearTimeout(timer);
    }, [search, category]);

    return (
        <PublicLayout>
            <Head>

                <title>
                    {pageTitle}
                </title>

                <meta
                    head-key="description"
                    name="description"
                    content={pageDescription}
                />

                <link
                    head-key="canonical"
                    rel="canonical"
                    href={canonicalUrl}
                />

                <meta
                    head-key="og:title"
                    property="og:title"
                    content={pageTitle}
                />

                <meta
                    head-key="og:description"
                    property="og:description"
                    content={pageDescription}
                />

                <meta
                    head-key="og:type"
                    property="og:type"
                    content="website"
                />

                <meta
                    head-key="og:url"
                    property="og:url"
                    content={canonicalUrl}
                />

                <meta
                    head-key="twitter:card"
                    name="twitter:card"
                    content="summary"
                />

                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={pageTitle}
                />

                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={pageDescription}
                />

                {hasFilter && (
                    <meta
                        head-key="robots"
                        name="robots"
                        content="noindex,follow"
                    />
                )}

            </Head>

            <main className="studies-page">

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="studies-header">

                    <div className="studies-header__inner">

                        <div className="studies-eyebrow">
                            Knowledge Center
                        </div>

                        <h1>
                            Kajian Big Data
                        </h1>

                        <p>
                            Eksplorasi berbagai kajian, analisis,
                            dan pemanfaatan Big Data dalam mendukung
                            statistik resmi.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <section className="studies-content">

                    <div className="studies-container">

                        {/* FILTER */}

                        <form
                            onSubmit={(event) => event.preventDefault()}
                            className="studies-filter"
                        >

                            <div className="studies-search">

                                <span className="studies-search__icon">
                                    ⌕
                                </span>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder={t.studies.searchPlaceholder}
                                />

                            </div>


                            <select
                                value={category}
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                            >

                                <option value="">
                                    Semua kategori
                                </option>

                                {categories?.map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>

                                ))}

                            </select>

                            {/* <button type="submit" className="studies-filter__button">{t.common.search}</button> */}

                            {(search || category) && (

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="studies-filter__reset"
                                >
                                    Reset
                                </button>

                            )}

                        </form>


                        {/* RESULT META */}

                        <div className="studies-result-meta">

                            <div>
                                Menampilkan{' '}
                                <strong>
                                    {studies?.total ?? 0}
                                </strong>{' '}
                                kajian
                            </div>

                            {(search || category) && (

                                <div className="studies-active-filter">

                                    Filter aktif

                                </div>

                            )}

                        </div>


                        {/* STUDIES */}

                        {studies?.data?.length > 0 ? (

                            <div className="study-grid">

                                {studies.data.map((study) => (

                                    <StudyCard
                                        key={study.id}
                                        study={study}
                                    />

                                ))}

                            </div>

                        ) : (

                            <div className="studies-empty">

                                <div className="studies-empty__icon">
                                    ↗
                                </div>

                                <h2>
                                    Kajian tidak ditemukan
                                </h2>

                                <p>
                                    Coba gunakan kata kunci atau
                                    kategori lain.
                                </p>

                                {(search || category) && (

                                    <button
                                        type="button"
                                        className="home-button home-button--secondary"
                                        onClick={handleReset}
                                    >
                                        Reset Filter
                                    </button>

                                )}

                            </div>

                        )}


                        {/* PAGINATION */}

                        {studies?.last_page > 1 && (

                            <nav className="studies-pagination">

                                <button
                                    type="button"
                                    disabled={!studies.prev_page_url}
                                    onClick={() => {
                                        if (studies.prev_page_url) {
                                            router.get(
                                                studies.prev_page_url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                }
                                            );
                                        }
                                    }}
                                >
                                    ←
                                </button>


                                {studies.links
                                    ?.slice(1, -1)
                                    .map((link, index) => {

                                        if (link.url === null) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="studies-pagination__ellipsis"
                                                >
                                                    ...
                                                </span>
                                            );
                                        }

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className={
                                                    link.active
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                onClick={() => {
                                                    router.get(
                                                        link.url,
                                                        {},
                                                        {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                        }
                                                    );
                                                }}
                                            >
                                                {link.label}
                                            </button>
                                        );
                                    })}


                                <button
                                    type="button"
                                    disabled={!studies.next_page_url}
                                    onClick={() => {
                                        if (studies.next_page_url) {
                                            router.get(
                                                studies.next_page_url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                }
                                            );
                                        }
                                    }}
                                >
                                    →
                                </button>

                            </nav>

                        )}

                    </div>

                </section>

            </main>

        </PublicLayout>
    );
}