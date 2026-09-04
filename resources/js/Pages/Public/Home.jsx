import { useEffect, useState } from 'react';

import PublicLayout from '../../Layouts/PublicLayout';
import { useLanguage } from '../../Contexts/LanguageContext';
import { Head } from '@inertiajs/react';
import StudyCard from '../../Components/StudyCard';
import TopicCard from '../../Components/TopicCard';

export default function Home({
    popularStudies,
    latestStudies,
    categories,
}) {
    const { language, t } = useLanguage();
    const [activePopular, setActivePopular] = useState(0);

    useEffect(() => {
        if (!popularStudies?.length || popularStudies.length <= 1) {
            return;
        }

        const timer = setInterval(() => {
            setActivePopular((current) =>
                (current + 1) % popularStudies.length
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [popularStudies]);

    const currentPopular =
        popularStudies?.[activePopular] ?? null;
    const seoTitle =
        'Kajian Big Data BPS | Badan Pusat Statistik';

    const seoDescription =
        'Temukan kajian, analisis, metode, dan pemanfaatan Big Data yang mendukung pengembangan statistik resmi di Badan Pusat Statistik.';

    const seoUrl =
        typeof window !== 'undefined'
            ? `${window.location.origin}/`
            : '/';
    return (
        <PublicLayout>
            <Head>

                <title>
                    {seoTitle}
                </title>

                <meta
                    head-key="description"
                    name="description"
                    content={seoDescription}
                />

                <link
                    head-key="canonical"
                    rel="canonical"
                    href={seoUrl}
                />

                <meta
                    head-key="og:title"
                    property="og:title"
                    content={seoTitle}
                />

                <meta
                    head-key="og:description"
                    property="og:description"
                    content={seoDescription}
                />

                <meta
                    head-key="og:type"
                    property="og:type"
                    content="website"
                />

                <meta
                    head-key="og:url"
                    property="og:url"
                    content={seoUrl}
                />

                <meta
                    head-key="twitter:card"
                    name="twitter:card"
                    content="summary"
                />

                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={seoTitle}
                />

                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={seoDescription}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',

                            '@type': 'WebSite',

                            name: 'Kajian Big Data BPS',

                            url: seoUrl,

                            description: seoDescription,

                            publisher: {
                                '@type': 'Organization',
                                name: 'Badan Pusat Statistik',
                            },
                        }),
                    }}
                />
            </Head>
            <div className="home-page">

                <section className="home-hero">

                    <div className="home-hero__grid">

                        <div className="home-hero__content">

                            <div className="home-eyebrow">
                                {t.home.eyebrow}
                            </div>

                            <h1>
                                {t.home.heroTitle}
                                <span>
                                    {t.home.heroTitleHighlight}
                                </span>
                            </h1>

                            <p className="home-hero__description">
                                {t.home.heroDescription}
                            </p>


                            <div className="home-hero__actions">

                                <a
                                    href="/kajian"
                                    className="home-button home-button--primary"
                                >
                                    {t.home.exploreStudies} →
                                </a>

                            </div>

                        </div>

                        {currentPopular && (
                            <div className="home-featured">

                                <a
                                    href={`/kajian/${currentPopular.slug}`}
                                    className="home-featured-link"
                                >

                                    <div className="home-featured__image">

                                        {currentPopular.cover_image ? (
                                            <img
                                                src={
                                                    currentPopular.cover_image.startsWith('http')
                                                        ? currentPopular.cover_image
                                                        : `/storage/${currentPopular.cover_image
                                                            .replace(/^\/+/, '')
                                                            .replace(/^storage\//, '')}`
                                                }
                                                alt={currentPopular.title}
                                            />
                                        ) : (
                                            <div className="home-featured__placeholder" />
                                        )}

                                        <span className="home-featured-label">
                                            {t.home.popularStudy}
                                        </span>

                                    </div>


                                    <div className="home-featured__content">

                                        <div className="home-featured__category">
                                            {currentPopular.category?.name ?? 'KAJIAN'}
                                        </div>

                                        <h2 className="home-featured__title">
                                            {currentPopular.title}
                                        </h2>

                                        {currentPopular.excerpt && (
                                            <p className="home-featured__excerpt">
                                                {currentPopular.excerpt}
                                            </p>
                                        )}

                                    </div>

                                </a>


                                <div className="home-featured__navigation">

                                    <button
                                        type="button"
                                        className="home-featured__arrow"
                                        onClick={() => {
                                            setActivePopular((current) =>
                                                current === 0
                                                    ? popularStudies.length - 1
                                                    : current - 1
                                            );
                                        }}
                                        aria-label={t.home.previousStudy}
                                    >
                                        ←
                                    </button>


                                    <div className="home-featured__dots">

                                        {popularStudies.map((study, index) => (
                                            <button
                                                key={study.id}
                                                type="button"
                                                className={
                                                    `home-featured__dot ${
                                                        index === activePopular
                                                            ? 'is-active'
                                                            : ''
                                                    }`
                                                }
                                                onClick={() => {
                                                    setActivePopular(index);
                                                }}
                                                aria-label={`${t.home.study} ${index + 1}`}
                                            />
                                        ))}

                                    </div>


                                    <button
                                        type="button"
                                        className="home-featured__arrow"
                                        onClick={() => {
                                            setActivePopular((current) =>
                                                (current + 1) % popularStudies.length
                                            );
                                        }}
                                        aria-label={t.home.nextStudy}
                                    >
                                        →
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>

                </section>
                <section className="home-latest">

                    <div className="home-section-header">

                        <div>

                            <div className="home-section-eyebrow">
                                {t.home.explore}
                            </div>

                            <h2 className="home-section-title">
                                {t.home.latestStudies}
                            </h2>

                        </div>

                        <a
                            href="/kajian"
                            className="home-section-link"
                        >
                            {t.home.seeAll} →
                        </a>

                    </div>

                    <div className="home-latest-slider">
                        {latestStudies?.map((study) => (
                            <div
                                className="home-latest-slider__item"
                                key={study.id}
                            >
                                <StudyCard study={study} />
                            </div>
                        ))}
                    </div>

                </section>
                <section
                    id="topics"
                    className="home-topics"
                >
                    <div className="home-topics__header">

                        <div className="home-topics__eyebrow">
                            {t.home.exploreByTopic}
                        </div>

                        <h2 className="home-topics__title">
                            {t.home.focusStudies}
                        </h2>

                        <p className="home-topics__description">
                            {t.home.focusDescription}
                        </p>

                    </div>

                    <div className="topic-grid">

                        {categories?.map((category, index) => (
                            <TopicCard
                                key={category.id}
                                category={category}
                                index={index}
                            />
                        ))}

                    </div>
                </section>
                <section className="home-statement">

                    <div className="home-statement__inner">

                        <div>

                            <div className="home-statement__eyebrow">
                                {t.home.bigDataBps}
                            </div>

                            <h2>
                                {t.home.dataNotOnly}
                                <span>{t.home.numbers}</span>
                            </h2>

                        </div>

                        <p>
                            {t.home.statement}
                        </p>

                    </div>

                </section>
                <section className="home-cta">

                    <div className="home-cta__box">

                        <div>

                            <div className="home-cta__eyebrow">
                                {t.home.knowledgeCenter}
                            </div>

                            <h2>
                                {t.home.findRelevant}
                                <span>
                                    {t.home.withYourNeeds}
                                </span>
                            </h2>

                            <p>
                                {t.home.ctaDescription}
                            </p>

                        </div>

                        <a
                            href="/kajian"
                            className="home-button home-button--primary"
                        >
                            {t.home.ctaDescription}
                        </a>

                    </div>

                </section>
            </div>

        </PublicLayout>
    );
}