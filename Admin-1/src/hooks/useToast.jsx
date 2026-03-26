import { useState, useCallback } from "react";

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((message, type = "success", duration = 4000) => {
        const id = Date.now();
        const toast = { id, message, type, duration };

        setToasts((prev) => [...prev, toast]);

        // Auto-remove après durée (optionnel, car le composant gère déjà son propre timer)
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);



    return { toasts, showToast, removeToast };
};