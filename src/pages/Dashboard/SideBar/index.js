import styled from "styled-components";
import SideBarList from "./List";

const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.isActive ? "20rem" : "0rem")};
    transform: ${(props) => (props.isActive ? "translateX(0)" : "translateX(-20rem)")};
    transition: all 0.3s ease-in-out;
    background-color: rgba(255, 255, 255, 1);
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
    {
        name: "Dashboard",
    },
    {
        name: "Products",
    },
    {
        name: "Favorites",
    },
    {
        name: "Order Lists",
        svg: "OrderList",
    },
    {
        name: "Products Stock",
        svg: "ProductStock",
    }
]

const SideBarPagesList = [
    {
        name: "Pricing",
    },
    {
        name: "To-do",
        svg: "ToDo",
    },
    {
        name: "Contact",
    },
    {
        name: "Invoice",
    },
    {
        name: "Team",
    }
]

const SideBarSettingsList = [
    {
        name: "Settings",
    },
    {
        name: "Logout",
    },
]

function SideBar({isActive, selectedSection, setSelectedSection, setConfirmation, setConfirmationText}){

    const handleSelect = (name) => {
        if(name === "Logout"){
            setConfirmation(true);
            setConfirmationText("Are you sure you want to logout?");
            return;
        }

        setSelectedSection(name);
        localStorage.setItem("currentSection", name);
    };

    return(
        <SideBarContainer isActive={isActive} aria-hidden={!isActive}>
            <SideBarIcon>
                <p style={{ color: "rgb(72, 128, 255)"}}>Star</p><p>Travel</p>
            </SideBarIcon>

            <SideBarList list={SideBarDefaultList} selectedSection={selectedSection} handleSelect={handleSelect}/>

            <SideBarList list={SideBarPagesList} selectedSection={selectedSection} handleSelect={handleSelect} dividerVisible subtitle="PAGES"/>

            <SideBarList list={SideBarSettingsList} selectedSection={selectedSection} handleSelect={handleSelect} dividerVisible/>
            
        </SideBarContainer>
    );
};

export default SideBar;