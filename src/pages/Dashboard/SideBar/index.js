import styled from "styled-components";
import SideBarList from "./List";
import { useEffect, useState, useRef } from "react";

const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: ${({ isActive, isMobile }) => (isActive ? (isMobile ? "15rem" : "20rem") : "0")};
    transform: ${({ isActive, isMobile }) => (isActive ? "translateX(0)" : isMobile ? "translateX(-15rem)" : "translateX(-20rem)")};
    position: ${({ isMobile }) => (isMobile ? "fixed" : "relative")};
    height: ${({ isMobile }) => (isMobile ? "100%" : "unset")};
    box-shadow: ${({ isMobile }) => (isMobile ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none")};
    z-index: 100;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    background-color: rgba(255, 255, 255, 1);
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    align-items: center;
`;

const SlideSideBar = styled.div`
    display: ${({ isMobile }) => (isMobile ? "flex" : "none")};
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const SideBarIcon = styled.div`
    display: flex;
    flex-direction: row;
    height: 4.5rem;
    justify-content: center;    
    align-items: center;
    font-family: "Nunito Sans", sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
`;

const SideBarDefaultList = [
    { name: "Dashboard" },
    { name: "Products" },
    { name: "Favorites" },
    { name: "Order Lists", svg: "OrderList" },
    { name: "Products Stock", svg: "ProductStock" }
];

const SideBarPagesList = [
    { name: "Pricing" },
    { name: "To-do", svg: "ToDo" },
    { name: "Contact" },
    { name: "Invoice" },
    { name: "Team" }
];

const SideBarSettingsList = [
    { name: "Settings" },
    { name: "Logout" }
];

function SideBar({ isActive, selectedSection, setSelectedSection, setConfirmation, setConfirmationText, setSideBar }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        if (isMobile) setSideBar(false);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobile, setSideBar]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && isActive && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSideBar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isActive, isMobile, setSideBar]);

    const handleSelect = (name) => {
        if (name === "Logout") {
            setConfirmation(true);
            setConfirmationText("Are you sure you want to logout?");
            return;
        }

        setSelectedSection(name);
        localStorage.setItem("currentSection", name);
    };

    return (
        <SideBarContainer ref={sidebarRef} isMobile={isMobile} isActive={isActive} aria-hidden={!isActive}>
            <IconContainer>
                <SlideSideBar isMobile={isMobile} onClick={() => setSideBar(prev => !prev)}>
                    <svg width="25" height="20" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 0.5625H17.25V1.9375H0.75V0.5625ZM0.75 6.0625H17.25V7.4375H0.75V6.0625ZM0.75 11.5625H17.25V12.9375H0.75V11.5625Z" fill="#202224"/>
                    </svg>
                </SlideSideBar>

                <SideBarIcon>
                    <p style={{ color: "rgb(72, 128, 255)" }}>Star</p><p>Travel</p>
                </SideBarIcon>
            </IconContainer>

            <SideBarList list={SideBarDefaultList} selectedSection={selectedSection} handleSelect={handleSelect} />
            <SideBarList list={SideBarPagesList} selectedSection={selectedSection} handleSelect={handleSelect} dividerVisible subtitle="PAGES" />
            <SideBarList list={SideBarSettingsList} selectedSection={selectedSection} handleSelect={handleSelect} dividerVisible />
        </SideBarContainer>
    );
};

export default SideBar;