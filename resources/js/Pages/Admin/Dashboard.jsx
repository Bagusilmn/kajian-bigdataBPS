import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import DashboardLayout from '../../Layouts/DashboardLayout';

export default function Dashboard({
    publishedStudies,
    submittedStudies,
    underReviewStudies,
    revisionStudies,
    directorReviewStudies,
    rejectedStudies,
    draftStudies,

    totalViews,
    uniqueVisitors,
    totalStudies,

    totalLikes,
    totalComments,
    totalShares,

    totalUsers,
    totalResearchers,
    totalReviewers,
    totalDirectors,
    totalCategories,

    topStudies,
    trendLabels,
    trendData,

    statusLabels,
    statusData,
}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const statusChartRef = useRef(null);
    const statusChartInstance = useRef(null);
    useEffect(() => {
        if (!chartRef.current) {
            return;
        }

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(
            chartRef.current,
            {
                type: 'line',

                data: {
                    labels: trendLabels ?? [],

                    datasets: [
                        {
                            label: 'Kunjungan',
                            data: trendData ?? [],

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

                            grid: {
                                color: '#eef2f6',
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
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [trendLabels, trendData]);
    useEffect(() => {
        if (!statusChartRef.current) {
            return;
        }

        if (statusChartInstance.current) {
            statusChartInstance.current.destroy();
        }

        statusChartInstance.current = new Chart(
            statusChartRef.current,
            {
                type: 'doughnut',

                data: {
                    labels: statusLabels ?? [],

                    datasets: [
                        {
                            data: statusData ?? [],
                            borderWidth: 0,
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
                    },
                },
            }
        );

        return () => {
            if (statusChartInstance.current) {
                statusChartInstance.current.destroy();
                statusChartInstance.current = null;
            }
        };
    }, [statusLabels, statusData]);

    return (
        <DashboardLayout>

            <div className="admin-dashboard">

                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="admin-header">

                    <div>
                        <div className="dashboard-eyebrow">
                            ADMIN DASHBOARD
                        </div>

                        <h1>
                            Management Platform
                        </h1>

                        <p>
                            Kelola pengguna, kategori, kajian, dan pantau
                            aktivitas platform Kajian Big Data BPS.
                        </p>
                    </div>

                </header>


                {/* =================================================
                    OVERVIEW
                ================================================= */}

                <section className="admin-overview">

                    <div className="admin-section-label">
                        OVERVIEW
                    </div>

                    <div className="admin-overview-grid">

                        <div className="admin-overview-card admin-overview-card--primary">
                            <span>Total Kajian</span>

                            <strong>
                                {Number(totalStudies).toLocaleString('id-ID')}
                            </strong>

                            <small>
                                Seluruh kajian di platform
                            </small>
                        </div>


                        <div className="admin-overview-card">
                            <span>Published</span>

                            <strong>
                                {Number(publishedStudies).toLocaleString('id-ID')}
                            </strong>

                            <small>
                                Kajian telah diterbitkan
                            </small>
                        </div>


                        <div className="admin-overview-card">
                            <span>Menunggu Review</span>

                            <strong>
                                {Number(submittedStudies).toLocaleString('id-ID')}
                            </strong>

                            <small>
                                Menunggu reviewer
                            </small>
                        </div>


                        <div className="admin-overview-card">
                            <span>Total Views</span>

                            <strong>
                                {Number(totalViews).toLocaleString('id-ID')}
                            </strong>

                            <small>
                                Seluruh kunjungan kajian
                            </small>
                        </div>

                    </div>

                </section>


                {/* =================================================
                    SECONDARY METRICS
                ================================================= */}

                <section className="admin-secondary">

                    <div className="admin-secondary-item">
                        <span>Unique Visitors</span>

                        <strong>
                            {Number(uniqueVisitors).toLocaleString('id-ID')}
                        </strong>
                    </div>


                    <div className="admin-secondary-item">
                        <span>Total Likes</span>

                        <strong>
                            {Number(totalLikes).toLocaleString('id-ID')}
                        </strong>
                    </div>


                    <div className="admin-secondary-item">
                        <span>Total Comments</span>

                        <strong>
                            {Number(totalComments).toLocaleString('id-ID')}
                        </strong>
                    </div>


                    <div className="admin-secondary-item">
                        <span>Total Shares</span>

                        <strong>
                            {Number(totalShares).toLocaleString('id-ID')}
                        </strong>
                    </div>

                </section>


                {/* =================================================
                    ANALYTICS
                ================================================= */}

                <section className="admin-section">

                    <div className="admin-section__heading">

                        <div>
                            <div className="admin-section-label">
                                ANALYTICS
                            </div>

                            <h2>
                                Platform activity
                            </h2>
                        </div>

                        <span className="admin-chart-summary">
                            Aktivitas 7 hari terakhir
                        </span>

                    </div>


                    <div className="admin-analytics-grid">

                        {/* TRAFFIC */}

                        <div className="admin-chart-card">

                            <div className="admin-card-heading">

                                <div>
                                    <strong>
                                        Traffic
                                    </strong>

                                    <span>
                                        Views kajian
                                    </span>
                                </div>

                                <span className="admin-card-period">
                                    7 hari
                                </span>

                            </div>

                            <div className="admin-chart">
                                <canvas ref={chartRef} />
                            </div>

                        </div>


                        {/* STATUS */}

                        <div className="admin-chart-card">

                            <div className="admin-card-heading">

                                <div>
                                    <strong>
                                        Status Kajian
                                    </strong>

                                    <span>
                                        Distribusi workflow
                                    </span>
                                </div>

                            </div>

                            <div className="admin-chart admin-chart--status">
                                <canvas ref={statusChartRef} />
                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    TOP STUDIES
                ================================================= */}

                <section className="admin-section">

                    <div className="admin-section__heading">

                        <div>
                            <div className="admin-section-label">
                                PERFORMANCE
                            </div>

                            <h2>
                                Kajian terpopuler
                            </h2>
                        </div>

                        <span className="admin-chart-summary">
                            Berdasarkan engagement
                        </span>

                    </div>


                    <div className="admin-top-studies">

                        {topStudies.length > 0 ? (

                            topStudies.map((study, index) => (

                                <div
                                    key={study.id}
                                    className="admin-top-study"
                                >

                                    <div className="admin-top-study__rank">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>


                                    <div className="admin-top-study__info">

                                        <h3>
                                            {study.title}
                                        </h3>

                                        <span>
                                            {study.category?.name ?? 'Tanpa kategori'}
                                        </span>

                                    </div>


                                    <div className="admin-top-study__metrics">

                                        <div>
                                            <strong>
                                                {Number(study.views_count).toLocaleString('id-ID')}
                                            </strong>

                                            <small>
                                                views
                                            </small>
                                        </div>


                                        <div>
                                            <strong>
                                                {Number(study.engagement_rate ?? 0).toFixed(1)}%
                                            </strong>

                                            <small>
                                                engagement
                                            </small>
                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="admin-empty">
                                Belum ada kajian yang dapat ditampilkan.
                            </div>

                        )}

                    </div>

                </section>


                {/* =================================================
                    MANAGEMENT
                ================================================= */}

                <section className="admin-section admin-management">

                    <div className="admin-section__heading">

                        <div>
                            <div className="admin-section-label">
                                MANAGEMENT
                            </div>

                            <h2>
                                Kelola platform
                            </h2>
                        </div>

                    </div>


                    <div className="admin-management-grid">

                        <a
                            href="/admin/users"
                            className="admin-management-card"
                        >
                            <div>
                                <span className="admin-management-card__eyebrow">
                                    USERS
                                </span>

                                <h3>
                                    Pengguna
                                </h3>

                                <p>
                                    Kelola akun peneliti, reviewer,
                                    direktur, dan administrator.
                                </p>
                            </div>

                            <span className="admin-management-card__arrow">
                                →
                            </span>
                        </a>


                        <a
                            href="/admin/categories"
                            className="admin-management-card"
                        >
                            <div>
                                <span className="admin-management-card__eyebrow">
                                    CONTENT
                                </span>

                                <h3>
                                    Kategori
                                </h3>

                                <p>
                                    Kelola kategori yang digunakan
                                    pada kajian.
                                </p>
                            </div>

                            <span className="admin-management-card__arrow">
                                →
                            </span>
                        </a>


                        <a
                            href="/admin/studies"
                            className="admin-management-card"
                        >
                            <div>
                                <span className="admin-management-card__eyebrow">
                                    STUDIES
                                </span>

                                <h3>
                                    Kelola Kajian
                                </h3>

                                <p>
                                    Pantau seluruh kajian dan
                                    request penghapusan.
                                </p>
                            </div>

                            <span className="admin-management-card__arrow">
                                →
                            </span>
                        </a>

                    </div>

                </section>

            </div>

        </DashboardLayout>
    );
}