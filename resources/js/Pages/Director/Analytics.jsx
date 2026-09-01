import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import DashboardLayout from '../../Layouts/DashboardLayout';
export default function Analytics({
    directorReviewStudies = 0,
    revisionStudies = 0,
    publishedStudies = 0,
    rejectedStudies = 0,

    recentReviews = [],

    statusLabels = [],
    statusData = [],

    trendLabels = [],
    trendData = [],
}) {
    const trendChartRef = useRef(null);
    const statusChartRef = useRef(null);
    const statusChartInstance = useRef(null);
    const trendChartInstance = useRef(null);


    useEffect(() => {
        if (!trendChartRef.current) {
            return;
        }

        if (trendChartInstance.current) {
            trendChartInstance.current.destroy();
        }

        trendChartInstance.current = new Chart(
            trendChartRef.current,
            {
                type: 'line',

                data: {
                    labels: trendLabels,

                    datasets: [
                        {
                            label: 'Final Review',
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
            if (trendChartInstance.current) {
                trendChartInstance.current.destroy();
                trendChartInstance.current = null;
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
                    labels: statusLabels,

                    datasets: [
                        {
                            data: statusData,
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

            <div className="user-dashboard">

                <div className="dashboard-header">

                    <div>

                        <div className="dashboard-eyebrow">
                            FINAL REVIEW ANALYTICS
                        </div>

                        <h1>
                            Analytics Direktur
                        </h1>

                        <p>
                            Ringkasan keputusan final yang kamu lakukan.
                        </p>

                    </div>

                </div>


                {/* STATS */}

                <div className="dashboard-stats">

                    <div className="director-analytics-stat">
                        <span>
                            MENUNGGU REVIEW FINAL
                        </span>

                        <strong>
                            {directorReviewStudies}
                        </strong>

                        <small>
                            Menunggu keputusan
                        </small>
                    </div>


                    <div className="director-analytics-stat">
                        <span>
                            REVISION
                        </span>

                        <strong>
                            {revisionStudies}
                        </strong>

                        <small>
                            Kondisi saat ini
                        </small>
                    </div>


                    <div className="director-analytics-stat">
                        <span>
                            PUBLISHED
                        </span>

                        <strong>
                            {publishedStudies}
                        </strong>

                        <small>
                            Kondisi saat ini
                        </small>
                    </div>


                    <div className="director-analytics-stat">
                        <span>
                            REJECTED
                        </span>

                        <strong>
                            {rejectedStudies}
                        </strong>

                        <small>
                            Kondisi saat ini
                        </small>
                    </div>

                </div>
                <div className="director-analytics-grid">

                    {/* STATUS DISTRIBUTION */}

                    <section className="director-analytics-section">

                        <div className="director-analytics-heading">

                            <div>

                                <div className="dashboard-eyebrow">
                                    STATUS DISTRIBUTION
                                </div>

                                <h2>
                                    Distribusi Status Kajian
                                </h2>

                                {/* <p>
                                    Komposisi seluruh kajian berdasarkan status terkini.
                                </p> */}

                            </div>

                        </div>


                        <div className="user-analytics-chart-card">

                            <div className="user-analytics-chart user-analytics-chart--small">
                                <canvas ref={statusChartRef} />
                            </div>

                        </div>

                    </section>


                    {/* TREND */}

                    <section className="director-analytics-section">

                        <div className="director-analytics-heading">

                            <div>

                                <div className="dashboard-eyebrow">
                                    FINAL REVIEW ACTIVITY
                                </div>

                                <h2>
                                    Aktivitas 7 Hari Terakhir
                                </h2>

                            </div>

                        </div>


                        <div className="user-analytics-chart-card">

                            <div className="user-analytics-chart">
                                <canvas ref={trendChartRef} />
                            </div>

                        </div>

                    </section>

                </div>
                {/* HISTORY */}

                <section className="director-analytics-section">

                    <div className="director-analytics-heading">

                        <div>

                            <div className="dashboard-eyebrow">
                                REVIEW HISTORY
                            </div>

                            <h2>
                                Keputusan Terbaru
                            </h2>

                        </div>

                    </div>


                    {recentReviews.length > 0 ? (

                        <div className="user-study-grid">

                            {recentReviews.map((review) => (

                                <article
                                    key={review.id}
                                    className="user-study-card"
                                >

                                    <div className="user-study-card__content">

                                        <span className="director-history-card__status">
                                            {review.stage === 'director'
                                                ? review.decision === 'approved'
                                                    ? 'Approved'
                                                    : review.decision === 'revision'
                                                        ? 'Revision'
                                                        : 'Rejected'
                                                : 'Review'}
                                        </span>


                                        <h3>
                                            {review.study?.title ?? 'Kajian'}
                                        </h3>


                                        <p>
                                            {review.study?.category?.name ??
                                                'Kajian'}
                                        </p>


                                        <div className="user-study-card__footer">

                                            <span>
                                                {review.created_at
                                                    ? new Date(
                                                        review.created_at
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
                                Belum ada keputusan final
                            </h3>

                            <p>
                                Riwayat keputusan final kamu akan
                                muncul di sini.
                            </p>

                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}