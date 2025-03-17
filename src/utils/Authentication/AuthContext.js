import { createContext, useState, useEffect } from 'react';
import { refreshToken, userAuth } from '../../services/userAccount';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshAccessToken() {
        try {
            const response = await refreshToken();

            if (!response.success) {
                setUser(null);
                setAccessToken(null);
                return;
            }

            setAccessToken(response.accessToken);
            await checkAuth();
        } catch (error) {
            console.error('Error refreshing access token:', error);
            setUser(null);
            setAccessToken(null);
        }
    }

    async function checkAuth() {
        try {
            const response = await userAuth();

            if (!response.success) {
                await refreshAccessToken();
                return;
            }

            setUser(response.user);
            setAccessToken(response.token);
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