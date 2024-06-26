// components/Toast.js
"use client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    return <ToastContainer />;
};

export const notify = (message, type = 'info') => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        default:
            toast.info(message);
    }
};

export default Toast;
