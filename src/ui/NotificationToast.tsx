import React from 'react'
import { toast } from 'react-toastify';

const NotificationToast = (text: string, type: string) => {
    if(type == 'success') {
        return toast.success(text, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "light",
        });
    }
    if(type == 'warning') {
        return toast.warn(text, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "light",
        });
    }
    if(type == 'error') {
        return toast.error(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "light",
        });
    }
}

export default NotificationToast;