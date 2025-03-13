import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshAccessToken() {
        try {
            const response = await fetch('https://api.ryandev.com.br/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            });
    
            if (!response.ok) {
                setUser(null);
                return;
            }
    
            const data = await response.json();
            setUser(prev => ({ ...prev, token: data.accessToken }));
        } catch (error) {
            console.error('Erro ao atualizar token:', error);
            setUser(null);
        }
    }    

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('https://star.api.ryandev.com.br/users/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    setUser(null);
                    return;
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Erro ao verificar autenticacao:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}