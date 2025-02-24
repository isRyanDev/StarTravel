import styled from "styled-components";
import SeachBar from "./SearchInput";
import ChangeLanguage from "./ChangeLanguage";
import Profile from "../../../components/Header/HeaderButtons/profile";

const TopBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 4.5rem;
    background-color: var(--secondary-color);
`

const TopBarLeft = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
`;

const SlideSideBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        cursor: pointer;
    }
`;

const TopBarRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
`

function TopBar({setSideBar}) {
    return(
        <TopBarContainer>
            <TopBarLeft>
                <SlideSideBar onClick={() => setSideBar(prev => !prev)}>
                    <svg width="25" height="20" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.75 0.5625H17.25V1.9375H0.75V0.5625ZM0.75 6.0625H17.25V7.4375H0.75V6.0625ZM0.75 11.5625H17.25V12.9375H0.75V11.5625Z" fill="#202224"/>
                    </svg>
                </SlideSideBar>

                <SeachBar/>

            </TopBarLeft>

            <TopBarRight>

                <ChangeLanguage/>

                <Profile/>
                
            </TopBarRight>
        </TopBarContainer>
    );
};

export default TopBar;