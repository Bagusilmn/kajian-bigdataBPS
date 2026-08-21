import DashboardLayout from '../../Layouts/DashboardLayout';

export default function Dashboard({
    submittedStudies,
    underReviewCount,
    revisionStudies,
    directorReviewStudies,
}) {
    return (
        <DashboardLayout>

            <div className="reviewer-dashboard">

                {/* HEADER */}

                <div className="reviewer-header">

                    <div>

                        <div className="dashboard-eyebrow">
                            REVIEWER DASHBOARD
                        </div>

                        <h1>
                            Kelola Review Kajian
                        </h1>

                        <p>
                            Tinjau kajian yang telah diajukan
                            oleh peneliti dan tentukan langkah
                            selanjutnya.
                        </p>

                    </div>

                </div>


                {/* STATISTICS */}

                <div className="reviewer-stats">

                    <div className="reviewer-stat">
                        <span>
                            MENUNGGU REVIEW
                        </span>

                        <strong>
                            {submittedStudies?.length ?? 0}
                        </strong>

                        <small>
                            Kajian baru masuk
                        </small>
                    </div>

                    <div className="reviewer-stat">
                        <span>
                            SEDANG DIREVIEW
                        </span>

                        <strong>
                            {underReviewCount}
                        </strong>

                        <small>
                            Kajian yang sedang kamu review
                        </small>
                    </div>

                    <div className="reviewer-stat">
                        <span>
                            REVISION
                        </span>

                        <strong>
                            {revisionStudies}
                        </strong>

                        <small>
                            Menunggu perbaikan
                        </small>
                    </div>

                </div>


                {/* SUBMITTED */}

                <section className="reviewer-section">

                    <div className="reviewer-section__heading">

                        <div>
                            <div className="dashboard-eyebrow">
                                INCOMING STUDIES
                            </div>

                            <h2>
                                Kajian Menunggu Review
                            </h2>
                        </div>

                    </div>


                    {submittedStudies?.length > 0 ? (

                        <div className="user-study-grid">

                            {submittedStudies.map((study) => (
                                <a
                                    key={study.id}
                                    href={`/reviewer/studies/${study.id}`}
                                    className="user-study-card"
                                >

                                    <div className="user-study-card__image">

                                        {study.cover_image ? (

                                            <img
                                                src={`/storage/${study.cover_image}`}
                                                alt={study.title}
                                            />

                                        ) : (

                                            <div className="user-study-card__placeholder" />

                                        )}

                                        <span>
                                            {study.category?.name ?? 'Kajian'}
                                        </span>

                                    </div>


                                    <div className="user-study-card__content">

                                        <span className="user-study-card__status">
                                            Submitted
                                        </span>

                                        <h3>
                                            {study.title}
                                        </h3>

                                        <p>
                                            {study.excerpt}
                                        </p>

                                        <div className="user-study-card__footer">

                                            <span>
                                                {study.user?.name ?? 'Peneliti'}
                                            </span>

                                            <span className="user-study-link">
                                                Mulai Review →
                                            </span>

                                        </div>

                                    </div>

                                </a>
                            ))}

                        </div>

                    ) : (

                        <div className="reviewer-empty">
                            Tidak ada kajian yang menunggu review.
                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}