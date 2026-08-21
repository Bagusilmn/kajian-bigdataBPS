import DashboardLayout from '../../Layouts/DashboardLayout';

export default function Dashboard({
    directorStudies = [],
    revisionStudies = 0,
    publishedStudies = 0,
    rejectedStudies = 0,
}) {
    return (
        <DashboardLayout>

            <div className="user-dashboard">

                <div className="dashboard-header">

                    <div>
                        <div className="dashboard-eyebrow">
                            DIRECTOR REVIEW
                        </div>

                        <h1>
                            Dashboard Direktur
                        </h1>

                        <p>
                            Review final kajian sebelum diterbitkan.
                        </p>
                    </div>

                </div>


                <div className="dashboard-stats">

                    <div className="dashboard-stat">
                        <span>
                            MENUNGGU REVIEW
                        </span>

                        <strong>
                            {directorStudies.length}
                        </strong>

                        <small>
                            Kajian menunggu keputusan final
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            REVISION
                        </span>

                        <strong>
                            {revisionStudies}
                        </strong>

                        <small>
                            Kajian dikembalikan untuk revisi
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            PUBLISHED
                        </span>

                        <strong>
                            {publishedStudies}
                        </strong>

                        <small>
                            Kajian yang telah diterbitkan
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            REJECTED
                        </span>

                        <strong>
                            {rejectedStudies}
                        </strong>

                        <small>
                            Kajian yang ditolak
                        </small>
                    </div>

                </div>


                <section className="user-studies-section">

                    <div className="user-studies-heading">

                        <div>
                            <div className="dashboard-eyebrow">
                                FINAL REVIEW
                            </div>

                            <h2>
                                Kajian Menunggu Keputusan
                            </h2>
                        </div>

                    </div>


                    {directorStudies.length === 0 ? (

                        <div className="studies-empty">

                            <h2>
                                Tidak ada kajian
                            </h2>

                            <p>
                                Belum ada kajian yang menunggu
                                review final.
                            </p>

                        </div>

                    ) : (

                        <div className="user-study-grid">

                            {directorStudies.map((study) => (

                                <a
                                    key={study.id}
                                    href={`/director/studies/${study.id}`}
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
                                            Review Final
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
                                                Review →
                                            </span>

                                        </div>

                                    </div>

                                </a>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}