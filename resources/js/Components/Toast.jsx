export default function Toast({
    open,
    type = 'success',
    message = '',
    onClose,
}) {
    if (!open) {
        return null;
    }

    const icon =
        type === 'error'
            ? '!'
            : type === 'warning'
                ? '!'
                : '✓';

    return (
        <div
            className={`global-toast global-toast--${type}`}
            role="status"
        >
            <div className="global-toast__icon">
                {icon}
            </div>

            <div className="global-toast__content">
                <strong>
                    {type === 'error'
                        ? 'Terjadi Kesalahan'
                        : type === 'warning'
                            ? 'Perhatian'
                            : 'Berhasil'}
                </strong>

                <span>
                    {message}
                </span>
            </div>

            <button
                type="button"
                className="global-toast__close"
                onClick={onClose}
                aria-label="Tutup"
            >
                ×
            </button>
        </div>
    );
}