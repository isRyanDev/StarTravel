import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const LinkStyled = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    text-decoration: none;
`;

const LoginButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: transparent;
    height: 2.8rem;
    padding: 0 1.5rem;
    border: 1px solid #212832;
    font-family: "Nunito Sans";
    font-size: 1.1rem;
    color: var(--primary-color);
    font-weight: bold;
    transition: all .7s;

    &:hover{
        background-color: var(--primary-color);
        color: var(--secondary-color);
    }
`;

const ProfileContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 15rem;
`;

const ProfileContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    width: 100%;
`;

const ProfileButton = styled.button`
    border-radius: .5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;

    & svg{
        height: 3.5rem;
        fill: var(--primary-color);
        transition: all .5s;

        &:hover{
            fill: ${(props) => props.color || "var(--secondary-color)"};
        }
    }
`;

const ProfileText = styled.p`
    font-family: "Nunito Sans";
    font-size: 1.4rem;
    color: var(--primary-color);
    font-weight: bold;
    transition: all .7s;
`;

const ModalContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: .7rem;
    padding: .5rem;
    max-height: 50vh;
    gap: .5rem;
    width: 70%;
    top: 3.8rem;
    background-color: var(--secondary-color);
    transition: all .7s;
    opacity: 0;
    transform: scale(0);

    &.active{
        opacity: 1;
        transform: scale(1);
    }
`;

const ModalButton = styled.button`
    font-family: "Nunito Sans";
    font-size: 1.2rem;
    color: var(--primary-color);
    font-weight: bold;
    width: 100%;
    background-color: transparent;
    border: none;
    padding: .5rem;
    border-radius: .5rem;
    cursor: pointer;
    transition: all .7s;

    &:hover{
        background-color: var(--primary-color);
        color: var(--secondary-color);
    }
`;

function Profile({color}) {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [isModalActive, setIsModalActive] = useState(false);
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const profileButtonRef = useRef(null);

    const profileToggle = () => {
        setIsModalActive(prevState => !prevState);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !profileButtonRef.current.contains(event.target)) {
                setIsModalActive(false); 
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const userLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("token");
        setUsername(null);

        navigate("/login");
    }

    return (
        <>
            {username ? (
                <ProfileContainer>
                    <ProfileContent>
                        <ProfileText>Hello, {username}</ProfileText>
                        <ProfileButton onClick={profileToggle} color={color} ref={profileButtonRef}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M256 73.825a182.175 182.175 0 1 0 182.18 182.18A182.177 182.177 0 0 0 256 73.825zm0 71.833a55.05 55.05 0 1 1-55.054 55.046A55.046 55.046 0 0 1 256 145.658zm.52 208.723h-80.852c0-54.255 29.522-73.573 48.885-90.906a65.68 65.68 0 0 0 62.885 0c19.363 17.333 48.885 36.651 48.885 90.906z" data-name="Profile"/>
                            </svg>
                        </ProfileButton>
                    </ProfileContent>

                    <ModalContainer ref={modalRef} className={isModalActive ? "active" : ""}>
                        <ModalButton onClick={() => navigate("/dashboard")}>
                            Dashboard
                        </ModalButton>
                        <ModalButton onClick={userLogout}>
                            Logout
                        </ModalButton>
                    </ModalContainer>
                </ProfileContainer>
            ) : (
                <LinkStyled to="/login">
                    <LoginButton>
                        Login
                    </LoginButton>
                </LinkStyled>
            )}
        </>
    );
}

export default Profile;