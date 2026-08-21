export default function TopicCard({ category, index }) {
    return (
        <a
            href={`/kajian?category=${category.id}`}
            className="topic-card"
        >
            <span className="topic-card__number">
                {String(index + 1).padStart(2, '0')}
            </span>

            <h3 className="topic-card__title">
                {category.name}
            </h3>

            <span className="topic-card__count">
                {category.studies_count ?? 0} kajian
            </span>

            <span className="topic-card__arrow">
                →
            </span>
        </a>
    );
}