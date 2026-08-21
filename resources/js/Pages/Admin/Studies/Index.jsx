import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '../../../Layouts/DashboardLayout';

export default function Index({
    studies = [],
    deletionRequests = [],
}) {
    const [selectedRequest, setSelectedRequest] = useState(null);

    const rejectForm = useForm({
        admin_notes: '',
    });

    const openReject = (request) => {
        setSelectedRequest(request);

        rejectForm.reset();
        rejectForm.clearErrors();
    };

    const closeReject = () => {
        setSelectedRequest(null);

        rejectForm.reset();
        rejectForm.clearErrors();
    };

    const approveDeletion = (request) => {
        const confirmed = window.confirm(
            `Setujui penghapusan kajian "${request.study?.title}"?`
        );

        if (!confirmed) {
            return;
        }

        rejectForm.patch(
            `/admin/deletion-requests/${request.id}/approve`
        );
    };

    const submitReject = (event) => {
        event.preventDefault();

        if (!selectedRequest) {
            return;
        }

        rejectForm.patch(
            `/admin/deletion-requests/${selectedRequest.id}/reject`,
            {
                onSuccess: () => closeReject(),
            }
        );
    };

    const statusLabel = {
        draft: 'Draft',
        submitted: 'Submitted',
        under_review: 'Under Review',
        revision: 'Revision',
        director_review: 'Review Direktur',
        rejected: 'Rejected',
        published: 'Published',
    };

    return (
        <DashboardLayout>

            <div className="admin-dashboard">

                {/* HEADER */}

                <div className="admin-header">

                    <div>
                        <div className="dashboard-eyebrow">
                            STUDY MANAGEMENT
                        </div>

                        <h1>
                            Kelola Kajian
                        </h1>

                        <p>
                            Pantau seluruh kajian dan kelola
                            permintaan penghapusan dari peneliti.
                        </p>
                    </div>

                </div>


                {/* DELETION REQUEST */}

                <section className="admin-section">

                    <div className="admin-section__heading">

                        <div>

                            <div className="dashboard-eyebrow">
                                DELETION REQUEST
                            </div>

                            <h2>
                                Permintaan Penghapusan
                            </h2>

                        </div>

                        <span className="admin-queue-count">
                            {deletionRequests.length} pending
                        </span>

                    </div>


                    {deletionRequests.length > 0 ? (

                        <div className="admin-deletion-list">

                            {deletionRequests.map((request) => (

                                <article
                                    key={request.id}
                                    className="admin-deletion-card"
                                >

                                    <div className="admin-deletion-card__content">

                                        <div className="admin-deletion-card__eyebrow">
                                            REQUEST #{request.id}
                                        </div>

                                        <h3>
                                            {request.study?.title ??
                                                'Kajian tidak ditemukan'}
                                        </h3>

                                        <p>
                                            Pemohon:{' '}
                                            <strong>
                                                {request.user?.name ?? '-'}
                                            </strong>
                                        </p>

                                        <div className="admin-deletion-card__reason">

                                            <span>
                                                ALASAN
                                            </span>

                                            <p>
                                                {request.reason}
                                            </p>

                                        </div>

                                        <small>
                                            Diajukan{' '}
                                            {request.created_at
                                                ? new Date(
                                                    request.created_at
                                                ).toLocaleDateString(
                                                    'id-ID',
                                                    {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }
                                                )
                                                : '-'}
                                        </small>

                                    </div>


                                    <div className="admin-deletion-card__actions">

                                        <a
                                            href={
                                                request.study
                                                    ? `/kajian/${request.study.slug}`
                                                    : '#'
                                            }
                                            className="admin-table-button"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Lihat Kajian
                                        </a>


                                        <button
                                            type="button"
                                            className="admin-table-button admin-table-button--danger"
                                            onClick={() =>
                                                openReject(request)
                                            }
                                        >
                                            Tolak
                                        </button>


                                        <button
                                            type="button"
                                            className="dashboard-primary-button"
                                            onClick={() =>
                                                approveDeletion(request)
                                            }
                                            disabled={
                                                rejectForm.processing
                                            }
                                        >
                                            Setujui & Hapus
                                        </button>

                                    </div>

                                </article>

                            ))}

                        </div>

                    ) : (

                        <div className="admin-empty">
                            Tidak ada permintaan penghapusan yang menunggu.
                        </div>

                    )}

                </section>


                {/* ALL STUDIES */}

                <section className="admin-section">

                    <div className="admin-section__heading">

                        <div>

                            <div className="dashboard-eyebrow">
                                ALL STUDIES
                            </div>

                            <h2>
                                Semua Kajian
                            </h2>

                        </div>

                        <span className="admin-queue-count">
                            {studies.length} kajian
                        </span>

                    </div>


                    <div className="admin-study-table-wrapper">

                        <table className="admin-study-table">

                            <thead>
                                <tr>
                                    <th>
                                        Kajian
                                    </th>

                                    <th>
                                        Penulis
                                    </th>

                                    <th>
                                        Kategori
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Dibuat
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {studies.length > 0 ? (

                                    studies.map((study) => (

                                        <tr key={study.id}>

                                            <td>
                                                <strong>
                                                    {study.title}
                                                </strong>

                                                {study.excerpt && (
                                                    <small>
                                                        {study.excerpt}
                                                    </small>
                                                )}
                                            </td>

                                            <td>
                                                {study.user?.name ?? '-'}
                                            </td>

                                            <td>
                                                {study.category?.name ??
                                                    '-'}
                                            </td>

                                            <td>
                                                <span
                                                    className={`admin-study-status admin-study-status--${study.status}`}
                                                >
                                                    {
                                                        statusLabel[
                                                            study.status
                                                        ] ??
                                                        study.status
                                                    }
                                                </span>
                                            </td>

                                            <td>
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
                                                    : '-'}
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="admin-table-empty"
                                        >
                                            Belum ada kajian.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>


                {/* REJECT MODAL */}

                {selectedRequest && (

                    <div className="admin-modal-backdrop">

                        <div className="admin-modal">

                            <div className="admin-modal__header">

                                <div>

                                    <div className="dashboard-eyebrow">
                                        REJECT REQUEST
                                    </div>

                                    <h2>
                                        Tolak Permintaan
                                    </h2>

                                </div>


                                <button
                                    type="button"
                                    className="admin-modal__close"
                                    onClick={closeReject}
                                >
                                    ×
                                </button>

                            </div>


                            <form
                                onSubmit={submitReject}
                                className="admin-form"
                            >

                                <p className="admin-modal__description">
                                    Jelaskan alasan Admin menolak
                                    permintaan penghapusan ini.
                                </p>


                                <div className="admin-form-field">

                                    <label>
                                        Catatan Admin
                                    </label>

                                    <textarea
                                        value={
                                            rejectForm.data.admin_notes
                                        }
                                        onChange={(event) =>
                                            rejectForm.setData(
                                                'admin_notes',
                                                event.target.value
                                            )
                                        }
                                        rows="6"
                                        placeholder="Tulis alasan penolakan..."
                                    />

                                    {rejectForm.errors.admin_notes && (

                                        <div className="form-error">
                                            {
                                                rejectForm.errors.admin_notes
                                            }
                                        </div>

                                    )}

                                </div>


                                <div className="admin-modal__actions">

                                    <button
                                        type="button"
                                        className="admin-table-button"
                                        onClick={closeReject}
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="admin-table-button admin-table-button--danger"
                                        disabled={
                                            rejectForm.processing
                                        }
                                    >
                                        {rejectForm.processing
                                            ? 'Memproses...'
                                            : 'Tolak Request'}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}