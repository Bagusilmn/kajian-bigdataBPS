import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import DashboardLayout from '../../Layouts/DashboardLayout';

export default function Analytics({
    totalReviews = 0,
    revisionCount = 0,
    forwardedCount = 0,
    rejectedCount = 0,
    recentReviews = [],
    decisionLabels = [],
    decisionData = [],
    reviewTrendLabels = [],
    reviewTrendData = [],
}) {
    const decisionChartRef = useRef(null);
    const trendChartRef = useRef(null);

    const decisionChartInstance = useRef(null);
    const trendChartInstance = useRef(null);
    useEffect(() => {
        if (!decisionChartRef.current) {
            return;
        }

        if (decisionChartInstance.current) {
            decisionChartInstance.current.destroy();
        }

        decisionChartInstance.current = new Chart(
            decisionChartRef.current,
            {
                type: 'doughnut',

                data: {
                    labels: decisionLabels,

                    datasets: [
                        {
                            data: decisionData,
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
            if (decisionChartInstance.current) {
                decisionChartInstance.current.destroy();
                decisionChartInstance.current = null;
            }
        };
    }, [decisionLabels, decisionData]);
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
                    labels: reviewTrendLabels,

                    datasets: [
                        {
                            label: 'Review',
                            data: reviewTrendData,

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
    }, [reviewTrendLabels, reviewTrendData]);
    return (
        <DashboardLayout>

            <div className="user-dashboard">

                <div className="dashboard-header">

                    <div>

                        <div className="dashboard-eyebrow">
                            REVIEW ANALYTICS
                        </div>

                        <h1>
                            Analytics Review
                        </h1>

                        <p>
                            Ringkasan aktivitas review yang kamu lakukan.
                        </p>

                    </div>

                </div>


                <div className="dashboard-stats">

                    <div className="dashboard-stat">
                        <span>
                            TOTAL REVIEW
                        </span>

                        <strong>
                            {totalReviews}
                        </strong>

                        <small>
                            Kajian yang saya review
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            REVISION
                        </span>

                        <strong>
                            {revisionCount}
                        </strong>

                        <small>
                            Meminta perbaikan
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            FORWARDED
                        </span>

                        <strong>
                            {forwardedCount}
                        </strong>

                        <small>
                            Diteruskan ke Direktur
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            REJECTED
                        </span>

                        <strong>
                            {rejectedCount}
                        </strong>

                        <small>
                            Kajian ditolak
                        </small>
                    </div>

                </div>

                <div className="reviewer-analytics-grid">

                    {/* DECISION ANALYTICS */}

                    <section className="user-studies-section">

                        <div className="user-studies-heading">

                            <div>

                                <div className="dashboard-eyebrow">
                                    DECISION ANALYTICS
                                </div>

                                <h2>
                                    Distribusi Keputusan
                                </h2>

                            </div>

                        </div>

                        <div className="user-analytics-chart-card">

                            <div className="user-analytics-chart user-analytics-chart--small">
                                <canvas ref={decisionChartRef} />
                            </div>

                        </div>

                    </section>


                    {/* REVIEW ACTIVITY */}

                    <section className="user-studies-section">

                        <div className="user-studies-heading">

                            <div>

                                <div className="dashboard-eyebrow">
                                    REVIEW ACTIVITY
                                </div>

                                <h2>
                                    Aktivitas Review
                                </h2>

                                <p>
                                    Jumlah kajian yang kamu proses dalam 7 hari terakhir.
                                </p>

                            </div>

                        </div>

                        <div className="user-analytics-chart-card">

                            <div className="user-analytics-chart">
                                <canvas ref={trendChartRef} />
                            </div>

                        </div>

                    </section>

                </div>          

                <section className="user-studies-section">

                    <div className="user-studies-heading">

                        <div>

                            <div className="dashboard-eyebrow">
                                REVIEW HISTORY
                            </div>

                            <h2>
                                Aktivitas Review Terbaru
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

                                        <div className="user-study-card__status">
                                            {review.decision === 'revision'
                                                ? 'Revision'
                                                : review.decision === 'approved'
                                                    ? 'Forwarded'
                                                    : 'Rejected'}
                                        </div>

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
                                BELUM ADA REVIEW
                            </div>

                            <h3>
                                Belum ada aktivitas review
                            </h3>

                            <p>
                                Riwayat review yang kamu lakukan akan
                                muncul di sini.
                            </p>

                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}