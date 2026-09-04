import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { useFeedback } from '../../Components/FeedbackProvider';
import { useLanguage } from '../../Contexts/LanguageContext';
import {
    Head,
    router,
    useForm,
    usePage,
} from '@inertiajs/react';

const serializeJsonLd = (data) =>
    JSON.stringify(data)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

export default function StudyDetail({
    study,
    seo,
    totalViews,
    uniqueVisitors,
    totalLikes,
    hasLiked,
    comments,
    totalComments,
    recommendedStudies,
}) {
    const { t } = useLanguage();
    const {
        showToast,
    } = useFeedback();
    const { auth } = usePage().props;
    const seoDescription =
        seo?.description ||
        study.excerpt?.trim() ||
        `Kajian ${study.title} dari Kajian Big Data BPS.`;

    const seoImage = seo?.image ?? null;

    const seoUrl = seo?.url ?? `/kajian/${study.slug}`;
    const [showShareMenu, setShowShareMenu] = useState(false);
    const shareButtonRef = useRef(null);
    const [shareMenuPosition, setShareMenuPosition] = useState({
        top: 0,
        left: 0,
    });
    const updateShareMenuPosition = () => {

        const button = shareButtonRef.current;

        if (!button) {
            return;
        }

        const rect =
            button.getBoundingClientRect();

        setShareMenuPosition({
            top: rect.bottom + 8,
            left: rect.left,
        });
    };
    useEffect(() => {

        if (!showShareMenu) {
            return;
        }

        updateShareMenuPosition();

        const handleScroll = () => {
            updateShareMenuPosition();
        };

        const handleResize = () => {
            updateShareMenuPosition();
        };

        window.addEventListener(
            'scroll',
            handleScroll,
            true
        );

        window.addEventListener(
            'resize',
            handleResize
        );

        return () => {

            window.removeEventListener(
                'scroll',
                handleScroll,
                true
            );

            window.removeEventListener(
                'resize',
                handleResize
            );
        };

    }, [showShareMenu]);
    const shareStudy = async (platform) => {
        const url = window.location.href;
        const title = study.title;

        if (platform === 'copy') {

            try {

                await navigator.clipboard.writeText(url);

                router.post(
                    `/kajian/${study.slug}/share`,
                    {
                        platform: 'copy',
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                );

                showToast(
                    'Link kajian berhasil disalin.',
                    'success'
                );

            } catch (error) {

                showToast(
                    'Link kajian gagal disalin.',
                    'error'
                );

            }

            return;
        }

        const shareUrls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(
                `${title}\n${url}`
            )}`,

            x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                title
            )}&url=${encodeURIComponent(url)}`,

            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                url
            )}`,
        };

        router.post(
            `/kajian/${study.slug}/share`,
            {
                platform,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    window.open(
                        shareUrls[platform],
                        '_blank',
                        'noopener,noreferrer'
                    );
                },
            }
        );

        setShowShareMenu(false);
    };
    const toggleLike = () => {
        router.post(
            `/kajian/${study.slug}/like`,
            {},
            {
                preserveScroll: true,
            }
        );
    };
    const commentForm = useForm({
        comment: '',
    });

    const submitComment = (event) => {
        event.preventDefault();

        commentForm.post(
            `/kajian/${study.slug}/comment`,
            {
                preserveScroll: true,
                onSuccess: () => {
                    commentForm.reset('comment');
                },
            }
        );
    };
    return (
        <PublicLayout>
            <Head>
                <title>{seo.title}</title>
                <meta
                    head-key="description"
                    name="description"
                    content={seo.description}
                />

                <link
                    head-key="canonical"
                    rel="canonical"
                    href={seo.url}
                />

                <meta
                    head-key="og:title"
                    property="og:title"
                    content={seo.title}
                />

                <meta
                    head-key="og:description"
                    property="og:description"
                    content={seo.description}
                />

                <meta
                    head-key="og:type"
                    property="og:type"
                    content="article"
                />

                <meta
                    head-key="og:url"
                    property="og:url"
                    content={seo.url}
                />

                {seo.image && (
                    <meta
                        head-key="og:image"
                        property="og:image"
                        content={seo.image}
                    />
                )}

                <meta
                    head-key="twitter:card"
                    name="twitter:card"
                    content={seo.image ? 'summary_large_image' : 'summary'}
                />

                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={seo.title}
                />

                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={seo.description}
                />

                {seo.image && (
                    <meta
                        head-key="twitter:image"
                        name="twitter:image"
                        content={seo.image}
                    />
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd({
                            '@context': 'https://schema.org',
                            '@type': 'Article',

                            headline: study.title,

                            description:
                                seo.description,

                            image: seo.image
                                ? [seo.image]
                                : undefined,

                            datePublished:
                                study.published_at ||
                                study.created_at,

                            dateModified:
                                study.published_at &&
                                study.updated_at &&
                                new Date(study.updated_at) < new Date(study.published_at)
                                    ? study.published_at
                                    : (
                                        study.updated_at ||
                                        study.published_at ||
                                        study.created_at
                                    ),

                            author: {
                                '@type': 'Person',

                                name:
                                    study.user?.name ||
                                    'Kajian Big Data BPS',
                            },

                            publisher: {
                                '@type': 'Organization',

                                name: 'Badan Pusat Statistik',
                            },

                            mainEntityOfPage: {
                                '@type': 'WebPage',

                                '@id': seo.url,
                            },

                            keywords:
                                study.keywords
                                    ?.map((keyword) => keyword.name)
                                    .join(', '),

                            articleSection:
                                study.category?.name ||
                                'Kajian Big Data',
                        }),
                    }}
                />
            </Head>

            <main className="detail-page">

                {/* HERO */}
                <section
                    className="detail-hero"
                    style={
                        study.cover_image
                            ? {
                                backgroundImage: `url('/storage/${study.cover_image}')`,
                            }
                            : undefined
                    }
                >
                    <div className="detail-hero__overlay" />

                    <div className="detail-container detail-hero__container">

                        <a
                            href="/kajian"
                            className="detail-hero__back"
                        >
                            ← Kembali ke Kajian
                        </a>

                        <div className="detail-hero__category">
                            {study.category?.name ?? 'KAJIAN'}
                        </div>

                        <h1 className="detail-hero__title">
                            {study.title}
                        </h1>

                        <div className="detail-hero__meta">

                            <span>
                                {new Date(
                                    study.published_at || study.created_at
                                ).toLocaleDateString(
                                    'id-ID',
                                    {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    }
                                )}
                            </span>

                            <span>•</span>

                            <span>
                                Kajian Big Data BPS
                            </span>

                            <span>•</span>

                            <span>
                                👁 {Number(totalViews).toLocaleString('id-ID')} views
                            </span>

                            <span>•</span>

                            <span>
                                👥 {Number(uniqueVisitors).toLocaleString('id-ID')} pengunjung
                            </span>

                        </div>

                        <div className="detail-hero__engagement">

                            <button
                                type="button"
                                className={`detail-like ${
                                    hasLiked
                                        ? 'detail-like--active'
                                        : ''
                                }`}
                                onClick={toggleLike}
                            >
                                <span>
                                    {hasLiked ? '♥' : '♡'}
                                </span>

                                <span>
                                    {Number(totalLikes).toLocaleString('id-ID')}
                                </span>

                                <span>
                                    suka
                                </span>
                            </button>

                            <div className="detail-share-wrapper">

                                <button
                                    ref={shareButtonRef}
                                    type="button"
                                    className="detail-share"
                                    onClick={() => {

                                        if (!showShareMenu) {
                                            updateShareMenuPosition();
                                        }

                                        setShowShareMenu(
                                            !showShareMenu
                                        );

                                    }}
                                >
                                    ↗ Bagikan
                                </button>
                                {showShareMenu &&
                                    shareButtonRef.current &&
                                    createPortal(
                                        <div
                                            className="detail-share-menu detail-share-menu--portal"
                                            style={{
                                                position: 'fixed',
                                                top: shareMenuPosition.top,
                                                left: shareMenuPosition.left,
                                            }}
                                        >

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    shareStudy('whatsapp')
                                                }
                                            >
                                                WhatsApp
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    shareStudy('x')
                                                }
                                            >
                                                X
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    shareStudy('linkedin')
                                                }
                                            >
                                                LinkedIn
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    shareStudy('copy')
                                                }
                                            >
                                                Salin Link
                                            </button>

                                        </div>,
                                        document.body
                                    )
                                }

                            </div>

                        </div>

                    </div>
                </section>


                {/* ARTICLE */}

                <section className="detail-content-section">

                    <div className="detail-container detail-reading">

                        {study.excerpt && (

                            <div className="detail-excerpt">
                                {study.excerpt}
                            </div>

                        )}

                        {study.keywords?.length > 0 && (
                            <div className="detail-keywords">

                                <div className="detail-keywords__label">
                                    Kata Kunci
                                </div>

                                <div className="detail-keywords__list">
                                    {study.keywords.map((keyword) => (
                                        <a
                                            key={keyword.id}
                                            href={`/kajian?search=${encodeURIComponent(
                                                keyword.name
                                            )}`}
                                            className="detail-keyword"
                                        >
                                            {keyword.name}
                                        </a>
                                    ))}
                                </div>

                            </div>
                        )}

                        <div
                            className="detail-content"
                            dangerouslySetInnerHTML={{
                                __html: study.content,
                            }}
                        />
                        <section className="detail-comments">

                            <div className="detail-comments__header">

                                <div>
                                    <div className="detail-eyebrow">
                                        DISKUSI
                                    </div>

                                    <h2>
                                        Komentar
                                    </h2>
                                </div>

                                <span>
                                    {Number(totalComments).toLocaleString('id-ID')} komentar
                                </span>

                            </div>


                            <div className="detail-comment-form">

                                {auth?.user ? (

                                    <form onSubmit={submitComment}>

                                        <textarea
                                            value={commentForm.data.comment}
                                            onChange={(event) =>
                                                commentForm.setData(
                                                    'comment',
                                                    event.target.value
                                                )
                                            }
                                            rows="5"
                                            placeholder={t.studyDetail.commentPlaceholder}
                                        />

                                        {commentForm.errors.comment && (
                                            <div className="form-error">
                                                {commentForm.errors.comment}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="dashboard-primary-button"
                                            disabled={commentForm.processing}
                                        >
                                            {commentForm.processing
                                                ? 'Mengirim...'
                                                : 'Kirim Komentar'}
                                        </button>

                                    </form>

                                ) : (

                                    <div className="detail-comment-login">

                                        <p>
                                            Masuk untuk memberikan komentar pada kajian ini.
                                        </p>

                                        <a
                                            href="/login"
                                            className="dashboard-primary-button"
                                        >
                                            Masuk
                                        </a>

                                    </div>

                                )}

                            </div>


                            <div className="detail-comment-list">
                                {comments?.data?.length > 0 ? (
                                    <>
                                        {comments.data.map((comment) => (
                                            <article
                                                key={comment.id}
                                                className="detail-comment"
                                            >
                                                <div className="detail-comment__avatar">
                                                    {comment.user?.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase() ?? 'U'}
                                                </div>

                                                <div className="detail-comment__body">
                                                    <div className="detail-comment__meta">
                                                        <strong>
                                                            {comment.user?.name ?? 'Pengguna'}
                                                        </strong>

                                                        <span>
                                                            {comment.created_at
                                                                ? new Date(
                                                                    comment.created_at
                                                                ).toLocaleDateString(
                                                                    'id-ID',
                                                                    {
                                                                        day: 'numeric',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                    }
                                                                )
                                                                : ''}
                                                        </span>
                                                    </div>

                                                    <p>
                                                        {comment.comment}
                                                    </p>
                                                </div>
                                            </article>
                                        ))}

                                        {/* PAGINATION */}
                                        {comments.last_page > 1 && (
                                            <div className="detail-comments-pagination">
                                                <button
                                                    type="button"
                                                    disabled={!comments.prev_page_url}
                                                    onClick={() => {
                                                        if (comments.prev_page_url) {
                                                            router.get(
                                                                comments.prev_page_url,
                                                                {},
                                                                {
                                                                    preserveScroll: true,
                                                                    preserveState: true,
                                                                }
                                                            );
                                                        }
                                                    }}
                                                >
                                                    ← Sebelumnya
                                                </button>

                                                <div className="detail-comments-pagination__pages">
                                                    {Array.from(
                                                        {
                                                            length: comments.last_page,
                                                        },
                                                        (_, index) => index + 1
                                                    ).map((page) => (
                                                        <button
                                                            key={page}
                                                            type="button"
                                                            className={
                                                                page ===
                                                                comments.current_page
                                                                    ? 'is-active'
                                                                    : ''
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    page !==
                                                                    comments.current_page
                                                                ) {
                                                                    router.get(
                                                                        comments.path +
                                                                            `?page=${page}`,
                                                                        {},
                                                                        {
                                                                            preserveScroll: true,
                                                                            preserveState: true,
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            {page}
                                                        </button>
                                                    ))}
                                                </div>

                                                <button
                                                    type="button"
                                                    disabled={!comments.next_page_url}
                                                    onClick={() => {
                                                        if (comments.next_page_url) {
                                                            router.get(
                                                                comments.next_page_url,
                                                                {},
                                                                {
                                                                    preserveScroll: true,
                                                                    preserveState: true,
                                                                }
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Berikutnya →
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="detail-comments-empty">
                                        <h3>
                                            Belum ada komentar
                                        </h3>

                                        <p>
                                            Jadilah orang pertama yang memberikan
                                            tanggapan pada kajian ini.
                                        </p>
                                    </div>
                                )}
                            </div>

                        </section>

                    </div>

                </section>
                {recommendedStudies?.length > 0 && (

                    <section className="detail-recommendations">

                        <div className="detail-container">

                            <div className="detail-recommendations__header">

                                <div>
                                    <div className="detail-eyebrow">
                                        BACA JUGA
                                    </div>

                                    <h2>
                                        Kajian yang Relevan
                                    </h2>
                                </div>

                            </div>


                            <div className="detail-recommendations__grid">

                                {recommendedStudies.map((recommended) => (

                                    <a
                                        key={recommended.id}
                                        href={`/kajian/${recommended.slug}`}
                                        className="detail-recommendation-card"
                                    >

                                        <div className="detail-recommendation-card__image">

                                            {recommended.cover_image ? (

                                                <img
                                                    src={`/storage/${recommended.cover_image}`}
                                                    alt={recommended.title}
                                                />

                                            ) : (

                                                <div className="detail-recommendation-card__placeholder" />

                                            )}

                                        </div>


                                        <div className="detail-recommendation-card__content">

                                            <span>
                                                {recommended.category?.name ?? 'Kajian'}
                                            </span>

                                            <h3>
                                                {recommended.title}
                                            </h3>

                                            <p>
                                                {recommended.excerpt}
                                            </p>

                                            <strong>
                                                Baca Kajian →
                                            </strong>

                                        </div>

                                    </a>

                                ))}

                            </div>

                        </div>

                    </section>

                )}
            </main>

        </PublicLayout>
    );
}
