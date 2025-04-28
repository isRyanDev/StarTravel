import { createContext, useState, useEffect } from "react";
import { refreshToken, userAuth } from "../../services/userAccount";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshAccessToken() {
        try {
            const response = await refreshToken();

            if (!response.success) {
                setUser(null);
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 100));

            await checkAuth();
        } catch (error) {
            setUser(null);
        }
    }

    async function checkAuth() {
        try {
            const response = await userAuth();

            if (!response.success) {
                await refreshAccessToken();
                return;
            }

            setUser(prevUser => ({
                ...prevUser, 
                ...response.user
            }));

        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refreshAccessToken();
        }, 15 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}