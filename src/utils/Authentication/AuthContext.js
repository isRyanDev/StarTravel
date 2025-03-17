import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshAccessToken() {
        try {
            const response = await fetch('https://star.api.ryandev.com.br/users/refresh-token', {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                setUser(null);
                setAccessToken(null);
                return;
            }

            const data = await response.json();
            setAccessToken(data.accessToken);

            await checkAuth();
        } catch (error) {
            console.error('Error refreshing access token:', error);
            setUser(null);
            setAccessToken(null);
        }
    }

    async function checkAuth() {
        try {
            const response = await fetch('https://star.api.ryandev.com.br/users/auth', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                await refreshAccessToken();
                return;
            }

            const data = await response.json();
            setUser(data);
            setAccessToken(data.token);
        } catch (error) {
            console.error('Error checking authentication:', error);
            setUser(null);
            setAccessToken(null);
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
        <AuthContext.Provider value={{ user, setUser, accessToken, loading }}>
            {children}
        </AuthContext.Provider>
    );
}