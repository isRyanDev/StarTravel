import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderButtonsContainer = styled.div`
    display: none;

    @media screen and (min-width: 636px){
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: var(--secondary-color);
        gap: 1.5rem;
        transition: all .7s;
    }
`

const LinkStyled = styled(Link)`
    text-decoration: none;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    border: none;
    background-color: transparent;
    border-radius: .5rem;
    color: var(--primary-color);
    font-weight: 300;
    transition: all .7s;
    cursor: pointer;

    p{
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.8rem;
    }

    &:hover{
        transform: scale(1.05);
        transition: all .7s;
        filter: drop-shadow(0 0 23px var(--primary-color));
    }
`

const buttons = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Destinations",
        path: "/destinations"
    },
    {
        name: "Services",
        path: "/services"
    }
]

function HeaderButtons() {
    return (
        <HeaderButtonsContainer>
            {buttons.map((button) => (
                <LinkStyled key={button.name} to={button.path}>
                    <Button>
                        <p>{button.name}</p>
                    </Button>
                </LinkStyled>
            ))}
        </HeaderButtonsContainer>
    )
}

export default HeaderButtons