import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`;

function Dashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const logged = localStorage.getItem("isLogged");

    useEffect(() => {
        document.title = "JStar Travel | Dashboard";
    });

    useEffect(() => {
        if (!logged && !username) {
            navigate("/login");
        }
        else{
            localStorage.removeItem("isLogged");
        }
    }, [logged, username, navigate]);

    return (
        <DashboardContainer>
            <h1>Dashboard</h1>
        </DashboardContainer>
    );
}

export default Dashboard;
