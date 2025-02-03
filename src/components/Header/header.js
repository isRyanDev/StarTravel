import styled from "styled-components";
import Logo from "../Logo/logo";
import HeaderButtons from "./HeaderButtons/header-buttons";
import Profile from "./HeaderButtons/profile";

const HeaderContainer = styled.header`
    display: flex;  
    flex-direction: row;
    height: 10vh;
    font-family: 'Poppins', sans-serif;
    justify-content: space-around;
    align-items: center;
    z-index: 100;

    @media screen and (min-width: 636px){
        gap: 1rem;
    }

    @media screen and (min-width: 1640px){
        display: flex;  
        width: 75vw;
    }
`

function Header({profileColor}){
    return(
        <HeaderContainer>

            <Logo/>
            
            <HeaderButtons/>

            <Profile color={profileColor}/>

        </HeaderContainer>
    )
}

export default Header