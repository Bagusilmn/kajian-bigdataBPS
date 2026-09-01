import { createContext, useContext, useState } from 'react';

import Toast from './Toast';
import ConfirmModal from './ConfirmModal';

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {

    const [toast, setToast] = useState({
        open: false,
        type: 'success',
        message: '',
    });

    const [confirmModal, setConfirmModal] = useState({
        open: false,
        title: '',
        message: '',
        confirmText: 'Ya, Lanjutkan',
        cancelText: 'Batal',
        danger: false,
        onConfirm: null,
    });

    const showToast = (
        message,
        type = 'success'
    ) => {

        setToast({
            open: true,
            type,
            message,
        });

        setTimeout(() => {
            setToast((current) => ({
                ...current,
                open: false,
            }));
        }, 3500);
    };


    const hideToast = () => {

        setToast((current) => ({
            ...current,
            open: false,
        }));
    };


    const openConfirm = ({
        title = 'Konfirmasi',
        message = 'Apakah kamu yakin ingin melanjutkan?',
        confirmText = 'Ya, Lanjutkan',
        cancelText = 'Batal',
        danger = false,
        onConfirm,
    }) => {

        setConfirmModal({
            open: true,
            title,
            message,
            confirmText,
            cancelText,
            danger,
            onConfirm,
        });
    };


    const closeConfirm = () => {

        setConfirmModal((current) => ({
            ...current,
            open: false,
            onConfirm: null,
        }));
    };


    const handleConfirm = () => {

        const callback =
            confirmModal.onConfirm;

        closeConfirm();

        if (typeof callback === 'function') {
            callback();
        }
    };


    return (
        <FeedbackContext.Provider
            value={{
                showToast,
                hideToast,
                openConfirm,
                closeConfirm,
            }}
        >

            {children}


            <Toast
                open={toast.open}
                type={toast.type}
                message={toast.message}
                onClose={hideToast}
            />


            <ConfirmModal
                open={confirmModal.open}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText={confirmModal.confirmText}
                cancelText={confirmModal.cancelText}
                danger={confirmModal.danger}
                onConfirm={handleConfirm}
                onCancel={closeConfirm}
            />

        </FeedbackContext.Provider>
    );
}


export function useFeedback() {

    const context =
        useContext(FeedbackContext);

    if (!context) {
        throw new Error(
            'useFeedback harus digunakan di dalam FeedbackProvider.'
        );
    }

    return context;
}