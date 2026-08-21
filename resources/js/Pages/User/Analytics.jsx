import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import DashboardLayout from '../../Layouts/DashboardLayout';

export default function Analytics({
    totalStudies = 0,
    publishedStudies = 0,
    totalViews = 0,
    totalLikes = 0,
    totalComments = 0,
    totalShares = 0,
    topStudies = [],
    trendLabels = [],
    trendData = [],
}) {
    const viewsChartRef = useRef(null);
    const engagementChartRef = useRef(null);

    const viewsChartInstance = useRef(null);
    const engagementChartInstance = useRef(null);
    useEffect(() => {
        if (!viewsChartRef.current) {
            return;
        }

        if (viewsChartInstance.current) {
            viewsChartInstance.current.destroy();
        }

        viewsChartInstance.current = new Chart(
            viewsChartRef.current,
            {
                type: 'line',

                data: {
                    labels: trendLabels,

                    datasets: [
                        {
                            label: 'Views',
                            data: trendData,

                            borderWidth: 2,
                            tension: 0.35,

                            pointRadius: 3,
                            pointHoverRadius: 5,

                            fill: true,
                        },
                    ],
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            display: false,
                        },
                    },

                    scales: {
                        y: {
                            beginAtZero: true,

                            ticks: {
                                precision: 0,
                            },
                        },

                        x: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                },
            }
        );

        return () => {
            if (viewsChartInstance.current) {
                viewsChartInstance.current.destroy();
                viewsChartInstance.current = null;
            }
        };
    }, [trendLabels, trendData]);

    useEffect(() => {
        if (!engagementChartRef.current) {
            return;
        }

        if (engagementChartInstance.current) {
            engagementChartInstance.current.destroy();
        }

        const labels = topStudies.map(
            (_, index) => `#${index + 1}`
        );

        const likes = topStudies.map(
            (study) => study.likes_count
        );

        const comments = topStudies.map(
            (study) => study.comments_count
        );

        const shares = topStudies.map(
            (study) => study.shares_count
        );

        engagementChartInstance.current = new Chart(
            engagementChartRef.current,
            {
                type: 'bar',

                data: {
                    labels,

                    datasets: [
                        {
                            label: 'Likes',
                            data: likes,
                        },

                        {
                            label: 'Comments',
                            data: comments,
                        },

                        {
                            label: 'Shares',
                            data: shares,
                        },
                    ],
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            position: 'bottom',
                        },

                        tooltip: {
                            callbacks: {
                                title: (items) => {
                                    const index = items[0]?.dataIndex;

                                    return index !== undefined
                                        ? topStudies[index]?.title ?? ''
                                        : '';
                                },
                            },
                        },
                    },

                    scales: {
                        y: {
                            beginAtZero: true,

                            ticks: {
                                precision: 0,
                            },
                        },

                        x: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                },
            }
        );

        return () => {
            if (engagementChartInstance.current) {
                engagementChartInstance.current.destroy();
                engagementChartInstance.current = null;
            }
        };
    }, [topStudies]);

    return (
        <DashboardLayout>

            <div className="user-dashboard">

                <div className="dashboard-header">
                    <div>
                        <div className="dashboard-eyebrow">
                            MY ANALYTICS
                        </div>

                        <h1>
                            Analytics Kajian
                        </h1>

                        <p>
                            Lihat performa dan engagement dari
                            kajian yang kamu publikasikan.
                        </p>
                    </div>
                </div>


                <div className="dashboard-stats">

                    <div className="dashboard-stat">
                        <span>TOTAL KAJIAN</span>
                        <strong>{totalStudies}</strong>
                        <small>Semua kajian saya</small>
                    </div>

                    <div className="dashboard-stat">
                        <span>PUBLISHED</span>
                        <strong>{publishedStudies}</strong>
                        <small>Sudah diterbitkan</small>
                    </div>

                    <div className="dashboard-stat">
                        <span>TOTAL VIEWS</span>
                        <strong>
                            {Number(totalViews).toLocaleString('id-ID')}
                        </strong>
                        <small>Seluruh kajian</small>
                    </div>

                    <div className="dashboard-stat">
                        <span>LIKES</span>
                        <strong>
                            {Number(totalLikes).toLocaleString('id-ID')}
                        </strong>
                        <small>Total suka</small>
                    </div>

                    <div className="dashboard-stat">
                        <span>COMMENTS</span>
                        <strong>
                            {Number(totalComments).toLocaleString('id-ID')}
                        </strong>
                        <small>Total komentar</small>
                    </div>

                    <div className="dashboard-stat">
                        <span>SHARES</span>
                        <strong>
                            {Number(totalShares).toLocaleString('id-ID')}
                        </strong>
                        <small>Total dibagikan</small>
                    </div>

                </div>

                <div className="user-analytics-grid">

                    {/* TRAFFIC */}

                    <section className="user-studies-section">

                        <div className="user-studies-heading">

                            <div>

                                <div className="dashboard-eyebrow">
                                    TRAFFIC
                                </div>

                                <h2>
                                    Perkembangan Views
                                </h2>

                            </div>

                            <span className="dashboard-secondary-link">
                                7 hari terakhir
                            </span>

                        </div>


                        <div className="user-analytics-chart-card">

                            <div className="user-analytics-chart">
                                <canvas ref={viewsChartRef} />
                            </div>

                        </div>

                    </section>


                    {/* ENGAGEMENT */}

                    <section className="user-studies-section">

                        <div className="user-studies-heading">

                            <div>

                                <div className="dashboard-eyebrow">
                                    ENGAGEMENT
                                </div>

                                <h2>
                                    Interaksi Kajian
                                </h2>

                                <p>
                                    Perbandingan likes, comments, dan shares
                                    pada kajian dengan performa terbaik.
                                </p>

                            </div>

                        </div>


                        <div className="user-analytics-chart-card">

                            <div className="user-analytics-chart user-analytics-chart--large">
                                <canvas ref={engagementChartRef} />
                            </div>

                        </div>

                    </section>

                </div>

                <section className="user-studies-section">

                    <div className="user-studies-heading">

                        <div>
                            <div className="dashboard-eyebrow">
                                PERFORMANCE
                            </div>

                            <h2>
                                Kajian Terpopuler
                            </h2>
                        </div>

                    </div>


                    {topStudies.length > 0 ? (

                        <div className="user-study-grid">

                            {topStudies.map((study, index) => (

                                <article
                                    key={study.id}
                                    className="user-study-card"
                                >

                                    <div className="user-study-card__content">

                                        <div className="dashboard-eyebrow">
                                            #{String(index + 1).padStart(2, '0')}
                                        </div>

                                        <h3>
                                            {study.title}
                                        </h3>

                                        <p>
                                            {study.category?.name ?? 'Kajian'}
                                        </p>


                                        <div className="user-analytics-metrics">

                                            <div>
                                                <strong>
                                                    {Number(
                                                        study.views_count
                                                    ).toLocaleString('id-ID')}
                                                </strong>

                                                <small>
                                                    Views
                                                </small>
                                            </div>

                                            <div>
                                                <strong>
                                                    {study.likes_count}
                                                </strong>

                                                <small>
                                                    Likes
                                                </small>
                                            </div>

                                            <div>
                                                <strong>
                                                    {study.comments_count}
                                                </strong>

                                                <small>
                                                    Comments
                                                </small>
                                            </div>

                                            <div>
                                                <strong>
                                                    {study.shares_count}
                                                </strong>

                                                <small>
                                                    Shares
                                                </small>
                                            </div>

                                            <div>
                                                <strong>
                                                    {study.engagement_rate}%
                                                </strong>

                                                <small>
                                                    Engagement
                                                </small>
                                            </div>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    ) : (

                        <div className="user-empty-state">
                            <div className="dashboard-eyebrow">
                                BELUM ADA DATA
                            </div>

                            <h3>
                                Belum ada kajian published
                            </h3>

                            <p>
                                Analytics akan muncul setelah
                                kajian kamu diterbitkan.
                            </p>
                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}