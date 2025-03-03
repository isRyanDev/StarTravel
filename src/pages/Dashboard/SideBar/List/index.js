import styled from "styled-components";

import { ReactComponent as DashboardSVG } from "../../../../assets/Svg-Icons/Dashboard.svg";
import { ReactComponent as ProductsSVG } from "../../../../assets/Svg-Icons/Products.svg";
import { ReactComponent as FavoritesSVG } from "../../../../assets/Svg-Icons/Favorites.svg";
import { ReactComponent as OrderListSVG } from "../../../../assets/Svg-Icons/OrderList.svg";
import { ReactComponent as ProductStockSVG } from "../../../../assets/Svg-Icons/ProductStock.svg";
import { ReactComponent as PricingSVG } from "../../../../assets/Svg-Icons/Pricing.svg";
import { ReactComponent as ToDoSVG } from "../../../../assets/Svg-Icons/ToDo.svg";
import { ReactComponent as ContactSVG } from "../../../../assets/Svg-Icons/Contact.svg";
import { ReactComponent as InvoiceSVG } from "../../../../assets/Svg-Icons/Invoice.svg";
import { ReactComponent as SettingsSVG } from "../../../../assets/Svg-Icons/Settings.svg";
import { ReactComponent as LogoutSVG } from "../../../../assets/Svg-Icons/Logout.svg";
import { ReactComponent as TeamSVG } from "../../../../assets/Svg-Icons/Team.svg";


const SideBarItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Subtitle = styled.div`
    display: ${(props) => props.subtitle ? "flex" : "none"};
    color: #202224;
    font-family: "Nunito Sans";
    font-size: .9rem;
    margin: .5rem 0;
    padding: 0 2.5rem;
    font-weight: 700;
`

const Divider = styled.div`
    display: ${(props) => (props.dividerVisible ? "block" : "none")};
    width: 100%;
    height: 1px;
    margin: .5rem 0;
    background-color: rgba(224, 224, 224, 1);
    opacity: ${(props) => (props.dividerVisible ? "1" : "0")};
`;

const SideBarItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;    
    align-items: center;
    font-family: "Nunito Sans", sans-serif;
    color: black;
    font-size: 1rem;
`;

const SideBarItemButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1.5rem;
    width: 65%;
    padding: 1rem;
    gap: 1rem;
    border-radius: .5rem;
    transition: all 0.3s ease-in-out;
    color: var(--secondary-color);
    background-color: var(--dashboard-secondary-color);

    &:hover{
        cursor: pointer;
    }
`;

const Selected = styled.div`
    position: absolute;
    left: 0;
    height: 1.5rem;
    width: 0.4rem;
    border-radius: 0 .5rem .5rem 0;
    padding: 1rem 0;
    background-color: var(--dashboard-secondary-color);
    transition: all 0.3s ease-in-out;
`;

const sideBarIcons = {
    Dashboard: DashboardSVG,
    Products: ProductsSVG,
    Favorites: FavoritesSVG,
    OrderList: OrderListSVG,
    ProductStock: ProductStockSVG,
    Pricing: PricingSVG,
    ToDo: ToDoSVG,
    Contact: ContactSVG,
    Invoice: InvoiceSVG,
    Settings: SettingsSVG,
    Logout: LogoutSVG,
    Team: TeamSVG
};

function SideBarList({list, selectedSection, handleSelect, dividerVisible, subtitle}){
    return(
        <SideBarItemsContainer> 
            <Divider dividerVisible={dividerVisible}/>

            <Subtitle subtitle={subtitle}>{subtitle ? subtitle : ""}</Subtitle>

            {list.map((item) => {

                const Icons = sideBarIcons[item.svg ? item.svg : item.name];
                
                return(
                    <SideBarItem key={item.name} onClick={() => handleSelect(item.name)}>
                        <Selected style={{ transform: selectedSection === item.name ? "translateX(0)" : "translateX(-0.4rem)" }}></Selected>

                        <SideBarItemButton style={{ backgroundColor: selectedSection === item.name ? "var(--dashboard-secondary-color)" : "var(--dashboard-primary-color)", 
                            color: selectedSection === item.name ? "var(--secondary-color)" : "black"}}> 

                            {Icons && <Icons style={{ fill: selectedSection === item.name ? "var(--secondary-color)" : "black", transition: "all .3s ease-in-out"}}/>}

                            <p>{item.name}</p>
                        </SideBarItemButton>
                    </SideBarItem>
                );
                
            })}
        </SideBarItemsContainer>
    )
}

export default SideBarList;