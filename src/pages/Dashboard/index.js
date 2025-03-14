import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import DashboardBody from "./Sections/Dashboard";
import ProductsBody from "./Sections/Products";
import FavoritesBody from "./Sections/Favorites";
import OrderListBody from "./Sections/OrderLists";
import ProductStockBody from "./Sections/ProductStock";
import PrincingBody from "./Sections/Pricing";
import ToDoBody from "./Sections/To-do";
import ContactBody from "./Sections/Contact";
import InvoiceBody from "./Sections/Invoice";
import TeamBody from "./Sections/Team";
import SettingsBody from "./Sections/Settings";
import ConfirmModal from "../../components/ConfirmModal";
import Notify from "../../components/Notify";
import Logout from "../../utils/logout";

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: rgba(245, 246, 250, 1);
`;

const DashboardContent = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    height: 100vh;
    width: 100%;
`

function Dashboard() {
    const [selectedSection, setSelectedSection] = useState("");
    const [activeSideBar, setActiveSideBar] = useState(true);
    const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        document.title = "Star Travel | Dashboard";
    }, []);

    useEffect(() => {
        if(confirm){
            Logout();
            setConfirm(false);
        }
    }, [setConfirm, confirm]);

    useEffect(() => {
        const currentSection = localStorage.getItem("currentSection");
    
        if (currentSection) {
            setSelectedSection(currentSection);
        } else {
            setSelectedSection("Dashboard");
        }
    }, []);

    const sections = {
        "Dashboard": <DashboardBody/>,
        "Products": <ProductsBody/>,
        "Favorites": <FavoritesBody/>,
        "Order Lists": <OrderListBody/>,
        "Products Stock": <ProductStockBody/>,
        "Pricing": <PrincingBody/>,
        "To-do": <ToDoBody/>,
        "Contact": <ContactBody/>,
        "Invoice": <InvoiceBody/>,
        "Team": <TeamBody/>,
        "Settings": <SettingsBody/>,
    }   

    return (
        <DashboardContainer>

            <Notify/>

            <ConfirmModal text={confirmationText} isOpen={confirmationIsOpen} setIsOpen={setConfirmationIsOpen} setConfirm={setConfirm}/>

            <SideBar setSideBar={setActiveSideBar} setConfirmationText={setConfirmationText} setConfirmation={setConfirmationIsOpen} selectedSection={selectedSection} setSelectedSection={setSelectedSection} isActive={activeSideBar}/>

            <DashboardContent>
                <TopBar setSideBar={setActiveSideBar}/>

                {sections[selectedSection]}
            </DashboardContent>
        </DashboardContainer>
    );
}

export default Dashboard;
