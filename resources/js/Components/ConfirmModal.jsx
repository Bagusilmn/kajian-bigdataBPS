export default function ConfirmModal({
    open,
    title = 'Konfirmasi',
    message = 'Apakah kamu yakin ingin melanjutkan?',
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    onConfirm,
    onCancel,
    danger = false,
}) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="global-confirm-modal__overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCancel();
                }
            }}
        >
            <div
                className="global-confirm-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="global-confirm-modal-title"
            >
                <div className="global-confirm-modal__header">

                    <div>
                        <div className="dashboard-eyebrow">
                            KONFIRMASI
                        </div>

                        <h2 id="global-confirm-modal-title">
                            {title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="global-confirm-modal__close"
                        onClick={onCancel}
                        aria-label="Tutup"
                    >
                        ×
                    </button>

                </div>

                <div className="global-confirm-modal__body">
                    <p>
                        {message}
                    </p>
                </div>

                <div className="global-confirm-modal__footer">

                    <button
                        type="button"
                        className="study-secondary-button"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className={
                            danger
                                ? 'global-confirm-modal__confirm global-confirm-modal__confirm--danger'
                                : 'global-confirm-modal__confirm'
                        }
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>
        </div>
    );
}