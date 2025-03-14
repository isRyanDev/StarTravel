import { useContext } from 'react';
import { AuthContext } from '../utils/Authentication/AuthContext';
import { Navigate } from 'react-router-dom';
import FullLoad from '../components/FullLoad';

function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <FullLoad />
        
    if (!user) return <Navigate to="/login" replace />;

    return children;
}

export default PrivateRoute;