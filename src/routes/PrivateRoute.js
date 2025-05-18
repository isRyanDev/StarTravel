import { useContext } from 'react';
import { AuthContext } from '../hooks/Authentication/AuthContext';
import { Navigate } from 'react-router-dom';
import FullScreenLoad from '../components/FullScreenLoad';

function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <FullScreenLoad />
        
    if (!user) return <Navigate to="/login" replace />;

    if (user && user.user_group === "Customers") {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
}

export default PrivateRoute;