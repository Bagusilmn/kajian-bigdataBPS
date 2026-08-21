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

                {/* HEADER */}

                <div className="admin-header">

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

                </div>


                {/* STATS */}

                <div className="admin-stats">

                    <div className="admin-stat-card">
                        <span>
                            TOTAL KAJIAN
                        </span>

                        <strong>
                            {totalStudies}
                        </strong>

                        <small>
                            Semua kajian
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            PUBLISHED
                        </span>

                        <strong>
                            {publishedStudies}
                        </strong>

                        <small>
                            Sudah diterbitkan
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            MENUNGGU REVIEW
                        </span>

                        <strong>
                            {submittedStudies}
                        </strong>

                        <small>
                            Menunggu reviewer
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            UNDER REVIEW
                        </span>

                        <strong>
                            {underReviewStudies}
                        </strong>

                        <small>
                            Sedang direview
                        </small>
                    </div>
                    <div className="admin-stat-card">
                        <span>
                            REVIEW DIREKTUR
                        </span>

                        <strong>
                            {directorReviewStudies}
                        </strong>

                        <small>
                            Menunggu keputusan final
                        </small>
                    </div>
                    <div className="admin-stat-card">
                        <span>
                            REJECTED
                        </span>

                        <strong>
                            {rejectedStudies}
                        </strong>

                        <small>
                            Kajian ditolak
                        </small>
                    </div>
                    <div className="admin-stat-card">
                        <span>
                            REVISION
                        </span>

                        <strong>
                            {revisionStudies}
                        </strong>

                        <small>
                            Perlu perbaikan
                        </small>
                    </div>


                    <div className="admin-stat-card admin-stat-card--accent">
                        <span>
                            TOTAL VIEWS
                        </span>

                        <strong>
                            {Number(totalViews).toLocaleString('id-ID')}
                        </strong>

                        <small>
                            Semua kajian
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            UNIQUE VISITORS
                        </span>

                        <strong>
                            {Number(uniqueVisitors).toLocaleString('id-ID')}
                        </strong>

                        <small>
                            Pengunjung unik
                        </small>
                    </div>
                    <div className="admin-stat-card">
                        <span>
                            TOTAL LIKES
                        </span>

                        <strong>
                            {Number(totalLikes).toLocaleString('id-ID')}
                        </strong>

                        <small>
                            Semua kajian
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            TOTAL COMMENTS
                        </span>

                        <strong>
                            {Number(totalComments).toLocaleString('id-ID')}
                        </strong>

                        <small>
                            Komentar publik
                        </small>
                    </div>


                    <div className="admin-stat-card">
                        <span>
                            TOTAL SHARES
                        </span>

                        <strong>
                            {Number(totalShares).toLocaleString('id-ID')}
                        </strong>

                        <small>
                            Semua platform
                        </small>
                    </div>
                </div>

                {/* ANALYTICS */}

                <div className="admin-analytics-grid">

                    <section className="admin-section">
                        <div className="admin-section__heading">

                            <div>
                                <div className="dashboard-eyebrow">
                                    TRAFFIC ANALYTICS
                                </div>

                                <h2>
                                    Kunjungan 7 Hari Terakhir
                                </h2>
                            </div>

                            <div className="admin-chart-summary">
                                {Number(totalViews).toLocaleString('id-ID')}
                                {' '}
                                total views
                            </div>

                        </div>

                        <div className="admin-chart-card">
                            <div className="admin-chart">
                                <canvas ref={chartRef} />
                            </div>
                        </div>
                    </section>


                    <section className="admin-section">
                        <div className="admin-section__heading">

                            <div>
                                <div className="dashboard-eyebrow">
                                    STUDY STATUS
                                </div>

                                <h2>
                                    Distribusi Status Kajian
                                </h2>
                            </div>

                            <div className="admin-chart-summary">
                                {Number(totalStudies).toLocaleString('id-ID')}
                                {' '}
                                total kajian
                            </div>

                        </div>

                        <div className="admin-chart-card">
                            <div className="admin-chart admin-chart--small">
                                <canvas ref={statusChartRef} />
                            </div>
                        </div>
                    </section>

                </div>

                {/* TOP STUDIES */}

                <section className="admin-section">

                    <div className="admin-section__heading">

                        <div>

                            <div className="dashboard-eyebrow">
                                PERFORMANCE
                            </div>

                            <h2>
                                Kajian dengan Engagement Tertinggi
                            </h2>

                        </div>

                    </div>


                    <div className="admin-top-studies">

                        {topStudies?.length > 0 ? (

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
                                            {study.category?.name ?? 'Kajian'}
                                        </span>

                                    </div>


                                    <div className="admin-top-study__metrics">

                                        <div>
                                            <strong>
                                                {Number(
                                                    study.views_count
                                                ).toLocaleString('id-ID')}
                                            </strong>

                                            <small>
                                                views
                                            </small>
                                        </div>


                                        <div>
                                            <strong>
                                                {Number(
                                                    study.likes_count
                                                ).toLocaleString('id-ID')}
                                            </strong>

                                            <small>
                                                likes
                                            </small>
                                        </div>


                                        <div>
                                            <strong>
                                                {Number(
                                                    study.comments_count
                                                ).toLocaleString('id-ID')}
                                            </strong>

                                            <small>
                                                comments
                                            </small>
                                        </div>


                                        <div>
                                            <strong>
                                                {Number(
                                                    study.shares_count
                                                ).toLocaleString('id-ID')}
                                            </strong>

                                            <small>
                                                shares
                                            </small>
                                        </div>


                                        <div className="admin-top-study__engagement">

                                            <strong>
                                                {Number(
                                                    study.engagement_rate
                                                ).toLocaleString('id-ID')}
                                                %
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
                                Belum ada data kajian populer.
                            </div>

                        )}

                    </div>

                </section>

                <section className="admin-section">

                    <div className="admin-section__heading">

                        <div>
                            <div className="dashboard-eyebrow">
                                MANAGEMENT
                            </div>

                            <h2>
                                Kelola Platform
                            </h2>
                        </div>

                    </div>


                    <div className="admin-management-grid">

                        <a
                            href="/admin/users"
                            className="admin-management-card"
                        >
                            <span className="admin-management-card__eyebrow">
                                USER MANAGEMENT
                            </span>

                            <h3>
                                Kelola Pengguna
                            </h3>

                            <p>
                                Tambah pengguna, ubah role, dan kelola
                                akun pengguna platform.
                            </p>

                            <span className="admin-management-card__link">
                                Kelola User →
                            </span>
                        </a>


                        <a
                            href="/admin/categories"
                            className="admin-management-card"
                        >
                            <span className="admin-management-card__eyebrow">
                                CATEGORY MANAGEMENT
                            </span>

                            <h3>
                                Kelola Kategori
                            </h3>

                            <p>
                                Tambahkan dan kelola kategori kajian
                                Big Data.
                            </p>

                            <span className="admin-management-card__link">
                                Kelola Kategori →
                            </span>
                        </a>


                        <a
                            href="/admin/studies"
                            className="admin-management-card"
                        >
                            <span className="admin-management-card__eyebrow">
                                STUDY MANAGEMENT
                            </span>

                            <h3>
                                Kelola Kajian
                            </h3>

                            <p>
                                Pantau kajian yang masuk dan tangani
                                permintaan penghapusan.
                            </p>

                            <span className="admin-management-card__link">
                                Kelola Kajian →
                            </span>
                        </a>

                    </div>

                </section>

            </div>

        </DashboardLayout>
    );
}