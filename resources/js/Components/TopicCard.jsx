export default function TopicCard({ category, index }) {
    return (
        <a
            href={`/kajian?category=${category.id}`}
            className="topic-card"
        >
            <div className="topic-card__image">
                {category.image ? (
                    <img
                        src={`/storage/${category.image}`}
                        alt={category.name}
                    />
                ) : (
                    <div className="topic-card__placeholder" />
                )}
            </div>

            <div className="topic-card__overlay" />

            <div className="topic-card__content">
                <span className="topic-card__number">
                    {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="topic-card__title">
                    {category.name}
                </h3>

                <div className="topic-card__bottom">
                    <span className="topic-card__count">
                        {category.studies_count ?? 0} kajian
                    </span>

                    <span className="topic-card__arrow">
                        →
                    </span>
                </div>
            </div>
        </a>
    );
}