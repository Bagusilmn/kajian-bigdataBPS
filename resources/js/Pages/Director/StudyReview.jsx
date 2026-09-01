import { useForm } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { useFeedback } from '../../Components/FeedbackProvider';

export default function StudyReview({ study }) {

    const {
        openConfirm,
    } = useFeedback();

    const revisionForm = useForm({
        notes: '',
    });

    const actionForm = useForm({});
    const approve = () => {

        openConfirm({
            title: 'Terbitkan Kajian?',
            message:
                'Kajian ini akan diterbitkan dan dapat dilihat oleh publik.',
            confirmText: 'Ya, Terbitkan',
            cancelText: 'Batal',

            onConfirm: () => {

                actionForm.patch(
                    `/director/studies/${study.id}/approve`
                );

            },
        });
    };

    const reject = () => {

        openConfirm({
            title: 'Tolak Kajian?',
            message:
                'Kajian ini akan ditolak dari proses publikasi.',
            confirmText: 'Ya, Tolak',
            cancelText: 'Batal',
            danger: true,

            onConfirm: () => {

                actionForm.patch(
                    `/director/studies/${study.id}/reject`
                );

            },
        });
    };

    const requestRevision = (event) => {
        event.preventDefault();

        revisionForm.patch(
            `/director/studies/${study.id}/revision`
        );
    };

    return (
        <DashboardLayout>

            <div className="review-page">

                <a
                    href="/director/dashboard"
                    className="review-back"
                >
                    ← Kembali ke Dashboard
                </a>


                <div className="review-header">

                    <div>

                        <div className="dashboard-eyebrow">
                            REVIEW FINAL
                        </div>

                        <h1>
                            {study.title}
                        </h1>

                        <div className="review-meta">

                            <span>
                                Penulis:{' '}
                                <strong>
                                    {study.user?.name ?? '-'}
                                </strong>
                            </span>

                            <span>•</span>

                            <span>
                                Kategori:{' '}
                                <strong>
                                    {study.category?.name ?? '-'}
                                </strong>
                            </span>

                            <span>•</span>

                            <span className="review-status">
                                {study.status?.replaceAll('_', ' ')}
                            </span>

                        </div>

                    </div>

                </div>


                <div className="review-layout">

                    <main className="review-main">

                        {study.cover_image && (

                            <div className="review-cover">

                                <img
                                    src={`/storage/${study.cover_image}`}
                                    alt={study.title}
                                />

                            </div>

                        )}


                        {study.excerpt && (

                            <section className="review-block">

                                <div className="dashboard-eyebrow">
                                    RINGKASAN
                                </div>

                                <p className="review-excerpt">
                                    {study.excerpt}
                                </p>

                            </section>

                        )}


                        <section className="review-block">

                            <div className="dashboard-eyebrow">
                                ISI KAJIAN
                            </div>

                            <article
                                className="review-content"
                                dangerouslySetInnerHTML={{
                                    __html: study.content,
                                }}
                            />

                        </section>

                    </main>


                    <aside className="review-panel">

                        {study.status === 'director_review' && (

                            <>

                                <div className="review-action-card">

                                    <div className="dashboard-eyebrow">
                                        KEPUTUSAN FINAL
                                    </div>

                                    <h2>
                                        Review Direktur
                                    </h2>

                                    <p>
                                        Tentukan keputusan akhir
                                        terhadap kajian ini.
                                    </p>


                                    <div className="review-actions">

                                        <button
                                            type="button"
                                            className="review-action review-action--approve"
                                            onClick={approve}
                                            disabled={actionForm.processing}
                                        >
                                            ✓ Terbitkan Kajian
                                        </button>


                                        <button
                                            type="button"
                                            className="review-action review-action--reject"
                                            onClick={reject}
                                            disabled={actionForm.processing}
                                        >
                                            ✕ Tolak Kajian
                                        </button>

                                    </div>

                                </div>


                                <div className="review-action-card">

                                    <div className="dashboard-eyebrow">
                                        REQUEST REVISION
                                    </div>

                                    <h2>
                                        Minta Revisi
                                    </h2>

                                    <p>
                                        Jelaskan perubahan yang
                                        perlu dilakukan peneliti.
                                    </p>

                                    <form
                                        onSubmit={requestRevision}
                                    >

                                        <textarea
                                            value={
                                                revisionForm.data.notes
                                            }
                                            onChange={(event) =>
                                                revisionForm.setData(
                                                    'notes',
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Tulis catatan Direktur..."
                                            rows="7"
                                        />

                                        {revisionForm.errors.notes && (

                                            <div className="form-error">
                                                {revisionForm.errors.notes}
                                            </div>

                                        )}

                                        <button
                                            type="submit"
                                            className="review-action review-action--revision"
                                            disabled={
                                                revisionForm.processing
                                            }
                                        >
                                            {revisionForm.processing
                                                ? 'Mengirim...'
                                                : 'Kembalikan untuk Revisi'}
                                        </button>

                                    </form>

                                </div>

                            </>

                        )}

                    </aside>

                </div>

            </div>

        </DashboardLayout>
    );
}