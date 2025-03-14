import { useContext } from 'react';
import { AuthContext } from '../utils/Authentication/AuthContext';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

const CustomLoader = styled.div`
    width: 50px;
    height: 50px;
    display: grid;

    &.custom-loader::before, &.custom-loader::after {
        content: "";
        grid-area: 1/1;
        --c: radial-gradient(farthest-side,#1692f8 92%,rgba(179, 53, 53, 0));
        background: var(--c) 50%  0, 
            var(--c) 50%  100%, 
            var(--c) 100% 50%, 
            var(--c) 0    50%;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        animation: s2 1s infinite;
    }

    &.custom-loader::before {
        margin: 4px;
        filter: hue-rotate(45deg);
        background-size: 8px 8px;
        animation-timing-function: linear
    }

    @keyframes s2 {
        100% {
            transform: rotate(.5turn)
        }
    }
`;

function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return (
        <Container>
            <CustomLoader/>;
        </Container>
    );
    
    if (!user) return <Navigate to="/login" replace />;

    return children;
}

export default PrivateRoute;