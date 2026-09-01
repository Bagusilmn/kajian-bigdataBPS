import { useEffect, useState } from 'react';

export default function InputModal({
    open,
    title = 'Masukkan Informasi',
    description = '',
    label = 'Input',
    placeholder = '',
    defaultValue = '',
    confirmText = 'Simpan',
    cancelText = 'Batal',
    required = false,
    onConfirm,
    onCancel,
}) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (open) {
            setValue(defaultValue);
        }
    }, [open, defaultValue]);

    if (!open) {
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (required && !value.trim()) {
            return;
        }

        onConfirm(value);
    };

    return (
        <div
            className="global-confirm-modal__overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCancel();
                }
            }}
        >
            <form
                className="global-confirm-modal"
                role="dialog"
                aria-modal="true"
                onSubmit={handleSubmit}
            >

                <div className="global-confirm-modal__header">

                    <div>
                        <div className="dashboard-eyebrow">
                            INPUT
                        </div>

                        <h2>
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

                    {description && (
                        <p>
                            {description}
                        </p>
                    )}

                    <div className="global-input-modal__field">

                        <label>
                            {label}
                            {required && ' *'}
                        </label>

                        <input
                            type="text"
                            value={value}
                            onChange={(event) =>
                                setValue(event.target.value)
                            }
                            placeholder={placeholder}
                            autoFocus
                        />

                    </div>

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
                        type="submit"
                        className="global-confirm-modal__confirm"
                        disabled={
                            required &&
                            !value.trim()
                        }
                    >
                        {confirmText}
                    </button>

                </div>

            </form>
        </div>
    );
}