import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGroup, getProfile } from "../../../services/userAccount";
import userLogout from "../../../utils/logout";

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 15rem;
`;

const LinkStyled = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    text-decoration: none;
`;

const HeaderButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: transparent;
    padding: 0 1rem;
    width: 100%;
    height: 2.8rem;
    border: 1px solid #212832;
    font-family: "Nunito Sans";
    font-size: 1.1rem;
    color: var(--primary-color);
    font-weight: bold;
    transition: all 0.7s;

    &:hover {
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
`;

const ProfileButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const ArrowSVG = styled.svg`
    transition: all 0.3s ease-in-out;
    transform: ${(props) => (props.isModalActive ? "rotate(180deg)" : "rotate(0deg)")};
`

const ProfileImg = styled.img`
    width: 3rem;
`;

const UserProfile = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const Username = styled.p`
    font-family: "Nunito Sans";
    font-size: 1rem;
    color: var(--primary-color);
    font-weight: bold;
    transition: all 0.7s;
`;

const UserRole = styled.p`
    font-family: "Nunito Sans";
    font-size: 12px;
    color: var(--dashboard-text-color);
    font-weight: 600;
    transition: all 0.7s;
`;

const ModalContainer = styled.div`
    display: ${(props) => (props.modalIsVisible ? "flex" : "none")};
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.7rem;
    max-height: 50vh;
    gap: 0.5rem;
    width: 100%;
    top: 3.5rem;
    background-color: var(--secondary-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.7s;
    padding: ${(props) => (props.isModalActive ? ".5rem" : "0")};
    z-index: ${(props) => (props.isModalActive ? "1" : "-1")};
    opacity: ${(props) => (props.isModalActive ? "1" : "0")};
    transform: ${(props) => (props.isModalActive ? "translateY(0)" : "translateY(-1rem)")};
`;

const ModalButton = styled.button`
    font-family: "Nunito Sans";
    font-size: 1rem;
    color: rgba(100, 100, 100, 1);
    width: 100%;
    background-color: transparent;
    border: none;
    transition: all 0.1s ease-in-out;

    &:hover {
        cursor: pointer;
        font-weight: bold;
        color: black;
    }
`;

const Profile = () => {
    const username = localStorage.getItem("username");
    const [role, setRole] = useState("");
    const [userProfileImg, setUserProfileImg] = useState("");
    const [isModalActive, setIsModalActive] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const profileButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !profileButtonRef.current.contains(event.target)
            ) {
                setIsModalActive(false);
                setTimeout(() => setModalIsVisible(false), 500);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchUserInfos = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const userRole = await getGroup(userId);
                    const userProfile = await getProfile(userId);
                    setRole(userRole.group);
                    setUserProfileImg(userProfile.profile);
                }
            } catch (error) {
                setRole("Client"); 
                setUserProfileImg("default");
            }
        };

        fetchUserInfos();
    }, []);

    const profileToggle = () => {
        if (!isModalActive) {
            setModalIsVisible(true);
            setTimeout(() => setIsModalActive(true), 10);
        } else {
            setIsModalActive(false);
            setTimeout(() => {
                if (!isModalActive) setModalIsVisible(false); 
            }, 500);
        }
    };    

    const profilePath = `/profile/${userProfileImg}.png`;

    return (
        <>
            {username ? (
                <ProfileContainer>
                    <ProfileButton isModalActive={isModalActive} onClick={profileToggle} ref={profileButtonRef}>
                        <ProfileImg src={profilePath} alt="" />
                        <UserProfile>
                            <Username>{username}</Username>
                            <UserRole>{role || "Loading..."}</UserRole>
                        </UserProfile>

                        <ArrowSVG isModalActive={isModalActive} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19.1C15.0258 19.1 19.1 15.0258 19.1 10C19.1 4.97421 15.0258 0.9 10 0.9C4.97421 0.9 0.9 4.97421 0.9 10C0.9 15.0258 4.97421 19.1 10 19.1Z" stroke="#5C5C5C" strokeWidth="0.2"/>
                            <path d="M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645Z" fill="#565656"/>
                        </ArrowSVG>
                    </ProfileButton>

                    <ModalContainer modalIsVisible={modalIsVisible} isModalActive={isModalActive} ref={modalRef}>
                        <ModalButton onClick={() => navigate("/dashboard")}>Dashboard</ModalButton>
                        <ModalButton onClick={userLogout}>Logout</ModalButton>
                    </ModalContainer>
                </ProfileContainer>
            ) : (
                <ButtonContainer>
                    <LinkStyled to="/login">
                        <HeaderButton>Login</HeaderButton>
                    </LinkStyled>
                    <LinkStyled to="/register">
                        <HeaderButton>Register</HeaderButton>
                    </LinkStyled>
                </ButtonContainer>
            )}
        </>
    );
};

export default Profile;