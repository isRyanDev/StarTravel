import { useContext } from 'react';
import { AuthContext } from '../hooks/Authentication/AuthContext';
import { Navigate } from 'react-router-dom';
import FullLoad from '../components/FullLoad';

function LoggedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <FullLoad />
        
    if (user) return <Navigate to="/" replace />;

    return children;
}

export default LoggedRoute;