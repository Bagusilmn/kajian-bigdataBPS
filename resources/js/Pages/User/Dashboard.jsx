import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';

export default function Dashboard({
    studies,
    totalStudies,
    draftStudies,
    reviewStudies,
    directorReviewStudies,
    rejectedStudies,
    publishedStudies,
}) {
    const [deletionStudy, setDeletionStudy] = useState(null);

    const deletionForm = useForm({
        reason: '',
    });

    const openDeletionModal = (study) => {
        setDeletionStudy(study);

        deletionForm.reset();
        deletionForm.clearErrors();
    };

    const closeDeletionModal = () => {
        setDeletionStudy(null);

        deletionForm.reset();
        deletionForm.clearErrors();
    };

    const submitDeletionRequest = (event) => {
        event.preventDefault();

        if (!deletionStudy) {
            return;
        }

        deletionForm.delete(
            `/user/studies/${deletionStudy.id}/deletion-request`,
            {
                onSuccess: () => {
                    closeDeletionModal();
                },
            }
        );
    };

    return (
        <DashboardLayout>

            <div className="user-dashboard">

                {/* HEADER */}

                <div className="dashboard-header">

                    <div>

                        <div className="dashboard-eyebrow">
                            USER DASHBOARD
                        </div>

                        <h1>
                            Selamat datang,
                            <span>
                                Peneliti Big Data
                            </span>
                        </h1>

                        <p>
                            Kelola dan pantau kajian yang kamu ajukan
                            melalui portal Kajian Big Data BPS.
                        </p>

                    </div>

                    <a
                        href="/user/studies/create"
                        className="dashboard-primary-button"
                    >
                        + Ajukan Kajian
                    </a>

                </div>


                {/* STATISTICS */}

                <div className="dashboard-stats">

                    <div className="dashboard-stat">
                        <span>
                            TOTAL KAJIAN
                        </span>

                        <strong>
                            {totalStudies}
                        </strong>

                        <small>
                            Semua kajian saya
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            DRAFT
                        </span>

                        <strong>
                            {draftStudies}
                        </strong>

                        <small>
                            Belum diajukan
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            REVIEW
                        </span>

                        <strong>
                            {reviewStudies}
                        </strong>

                        <small>
                            Sedang diproses
                        </small>
                    </div>


                    <div className="dashboard-stat">
                        <span>
                            DIRECTOR REVIEW
                        </span>

                        <strong>
                            {directorReviewStudies}
                        </strong>

                        <small>
                            Menunggu keputusan direktur
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
                            Sudah diterbitkan
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
                            Kajian ditolak
                        </small>
                    </div>

                </div>


                {/* STUDIES */}

                <section className="user-studies-section">

                    <div className="user-studies-heading">

                        <div>

                            <div className="dashboard-eyebrow">
                                MY STUDIES
                            </div>

                            <h2>
                                Kajian Saya
                            </h2>

                        </div>

                    </div>


                    {studies?.length > 0 ? (

                        <div className="user-study-grid">

                            {studies.map((study) => {

                                const canEdit =
                                    study.status === 'draft' ||
                                    study.status === 'revision';

                                const href = canEdit
                                    ? `/user/studies/${study.id}/edit`
                                    : `/kajian/${study.slug}`;

                                return (
                                    <a
                                        key={study.id}
                                        href={href}
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

                                            <div className={`user-study-card__status status-${study.status}`}>
                                                {study.status?.replace('_', ' ')}
                                            </div>

                                            <h3>
                                                {study.title}
                                            </h3>

                                            <p>
                                                {study.excerpt}
                                            </p>


                                            {study.status === 'revision' && (

                                                <div className="user-revision-note">

                                                    <strong>
                                                        Catatan Reviewer
                                                    </strong>

                                                    <p>
                                                        {study.reviews?.[0]?.notes ??
                                                            'Kajian memerlukan revisi.'}
                                                    </p>

                                                </div>

                                            )}


                                            <div className="user-study-card__footer">

                                                <span>
                                                    {study.created_at
                                                        ? new Date(
                                                            study.created_at
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


                                                <div className="user-study-card__actions">

                                                    {study.status === 'draft' && (

                                                        <a
                                                            href={`/user/studies/${study.id}/edit`}
                                                            className="user-study-link"
                                                        >
                                                            Edit →
                                                        </a>

                                                    )}


                                                    {study.status === 'revision' && (

                                                        <a
                                                            href={`/user/studies/${study.id}/edit`}
                                                            className="user-study-link"
                                                        >
                                                            Revisi →
                                                        </a>

                                                    )}

                                                    <button
                                                        type="button"
                                                        className="user-study-delete-link"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();

                                                            openDeletionModal(study);
                                                        }}
                                                    >
                                                        Ajukan Penghapusan
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </a>
                                );
                            })}

                        </div>

                    ) : (

                        <div className="user-empty-state">

                            <div className="dashboard-eyebrow">
                                BELUM ADA KAJIAN
                            </div>

                            <h3>
                                Belum ada kajian yang kamu ajukan
                            </h3>

                            <p>
                                Kajian yang kamu buat akan muncul
                                di halaman ini.
                            </p>

                            <a
                                href="/user/studies/create"
                                className="dashboard-primary-button"
                            >
                                + Ajukan Kajian
                            </a>

                        </div>

                    )}

                </section>
                {deletionStudy && (

                    <div className="user-modal-backdrop">

                        <div className="user-modal">

                            <div className="user-modal__header">

                                <div>

                                    <div className="dashboard-eyebrow">
                                        REQUEST PENGHAPUSAN
                                    </div>

                                    <h2>
                                        Ajukan Penghapusan Kajian
                                    </h2>

                                </div>


                                <button
                                    type="button"
                                    className="user-modal__close"
                                    onClick={closeDeletionModal}
                                >
                                    ×
                                </button>

                            </div>


                            <div className="user-modal__body">

                                <p>
                                    Kamu akan mengajukan permintaan penghapusan:
                                </p>

                                <strong>
                                    {deletionStudy.title}
                                </strong>

                                <p className="user-modal__hint">
                                    Permintaan akan diperiksa oleh Admin sebelum
                                    kajian benar-benar dihapus.
                                </p>


                                <form onSubmit={submitDeletionRequest}>

                                    <div className="user-form-field">

                                        <label>
                                            Alasan Penghapusan
                                        </label>

                                        <textarea
                                            value={deletionForm.data.reason}
                                            onChange={(event) =>
                                                deletionForm.setData(
                                                    'reason',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Jelaskan alasan penghapusan kajian..."
                                            rows="6"
                                        />

                                        {deletionForm.errors.reason && (

                                            <div className="form-error">
                                                {deletionForm.errors.reason}
                                            </div>

                                        )}

                                    </div>


                                    <div className="user-modal__actions">

                                        <button
                                            type="button"
                                            className="admin-table-button"
                                            onClick={closeDeletionModal}
                                        >
                                            Batal
                                        </button>

                                        <button
                                            type="submit"
                                            className="dashboard-primary-button"
                                            disabled={deletionForm.processing}
                                        >
                                            {deletionForm.processing
                                                ? 'Mengirim...'
                                                : 'Ajukan Penghapusan'}
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                )}
            </div>

        </DashboardLayout>
    );
}