export default function StudyCard({ study }) {
    const formatDate = (date) => {
        if (!date) return '';

        return new Date(date).toLocaleDateString(
            'id-ID',
            {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }
        );
    };

    return (
        <a
            href={`/kajian/${study.slug}`}
            className="study-card"
        >
            {/* IMAGE */}
            <div className="study-card__image">

                {study.cover_image ? (
                    <img
                        src={
                            study.cover_image.startsWith('http')
                                ? study.cover_image
                                : `/storage/${study.cover_image
                                    .replace(/^\/+/, '')
                                    .replace(/^storage\//, '')}`
                        }
                        alt={study.title}
                    />
                ) : (
                    <div className="study-card__placeholder">
                        <div className="study-card__placeholder-pattern" />

                        <div className="study-card__placeholder-content">
                            <span className="study-card__placeholder-eyebrow">
                                KAJIAN
                            </span>

                            <strong>
                                BIG DATA
                            </strong>

                            <span>
                                BADAN PUSAT STATISTIK
                            </span>
                        </div>
                    </div>
                )}

                <span className="study-card__category">
                    {study.category?.name ?? 'Kajian'}
                </span>

            </div>


            {/* CONTENT */}
            <div className="study-card__content">

                <div className="study-card__meta">

                    <span className="study-card__date">
                        {formatDate(
                            study.published_at ||
                            study.created_at
                        )}
                    </span>

                    <span className="study-card__dot">
                        •
                    </span>

                    <span className="study-card__status">
                        Published
                    </span>

                </div>


                <h3 className="study-card__title">
                    {study.title}
                </h3>


                <p className="study-card__excerpt">
                    {study.excerpt}
                </p>


                {/* KEYWORDS */}
                {study.keywords?.length > 0 && (
                    <div className="study-card__keywords">

                        {study.keywords
                            .slice(0, 3)
                            .map((keyword) => (
                                <span
                                    key={keyword.id}
                                    className="study-card__keyword"
                                >
                                    {keyword.name}
                                </span>
                            ))}

                        {study.keywords.length > 3 && (
                            <span className="study-card__keyword study-card__keyword--more">
                                +{study.keywords.length - 3}
                            </span>
                        )}

                    </div>
                )}


                {/* FOOTER */}
                <div className="study-card__footer">

                    <span className="study-card__link">
                        Baca Kajian
                    </span>

                    <span className="study-card__arrow">
                        →
                    </span>

                </div>

            </div>

        </a>
    );
}