import { useContext } from 'react';
import { AuthContext } from '../hooks/Authentication/AuthContext';
import { Navigate } from 'react-router-dom';
import FullScreenLoad from '../components/FullScreenLoad';

function UnloggedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <FullScreenLoad />
        
    if (!user) return <Navigate to="/login" replace />;

    return children;
}

export default UnloggedRoute;