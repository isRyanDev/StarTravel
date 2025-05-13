import { createContext, useContext, useState, useCallback } from "react";

const NotifyContext = createContext();

export function NotifyProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((text) => {
        const id = Date.now(); 
        setNotifications((prev) => {
            const updated = [...prev, { id, text }];
            return updated.slice(-5); 
        });
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
        <NotifyContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotifyContext.Provider>
    );
}


export const useNotify = () => useContext(NotifyContext);
