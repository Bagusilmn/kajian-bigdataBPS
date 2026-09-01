import DashboardLayout from '../../Layouts/DashboardLayout';

export default function ActiveStudies({ studies = [] }) {
    return (
        <DashboardLayout>

            <div className="reviewer-dashboard">

                {/* HEADER */}

                <div className="reviewer-header">

                    <div>

                        <div className="dashboard-eyebrow">
                            CURRENT REVIEWS
                        </div>

                        <h1>
                            Sedang Direview
                        </h1>

                        <p>
                            Kajian yang sedang kamu tangani untuk proses review.
                        </p>

                    </div>

                </div>


                {/* STUDIES */}

                <section className="reviewer-section">

                    <div className="reviewer-section__heading">

                        <div>

                            <div className="dashboard-eyebrow">
                                ACTIVE STUDIES
                            </div>

                            <h2>
                                Kajian yang Sedang Ditangani
                            </h2>

                        </div>

                        <span className="reviewer-study-count">
                            {studies.length} kajian
                        </span>

                    </div>


                    {studies.length > 0 ? (

                        <div className="user-study-grid">

                            {studies.map((study) => (

                                <a
                                    key={study.id}
                                    href={`/reviewer/studies/${study.id}`}
                                    className="user-study-card"
                                >

                                    {/* IMAGE */}

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


                                    {/* CONTENT */}

                                    <div className="user-study-card__content">

                                        <span className="user-study-card__status">
                                            Under Review
                                        </span>

                                        <h3>
                                            {study.title}
                                        </h3>

                                        <p>
                                            {study.excerpt || 'Tidak ada ringkasan kajian.'}
                                        </p>


                                        {/* FOOTER */}

                                        <div className="user-study-card__footer">

                                            <span>
                                                {study.user?.name ?? 'Peneliti'}
                                            </span>

                                            <span className="user-study-link">
                                                Lanjut Review →
                                            </span>

                                        </div>

                                    </div>

                                </a>

                            ))}

                        </div>

                    ) : (

                        <div className="reviewer-empty">

                            Tidak ada kajian yang sedang direview.

                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}