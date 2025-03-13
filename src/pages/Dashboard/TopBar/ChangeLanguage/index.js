import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import USflag from "../../../../assets/Images/us-flag.png";
import BRflag from "../../../../assets/Images/br-flag.png";

import { ReactComponent as ArrowBottomSVG } from "../../../../assets/Svg-Icons/ArrowBottom.svg";

const LanguagesContainer = styled.div`
    display: none;
    flex-direction: row;
    position: relative;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    width: 12rem;
    font-family: "Nunito Sans";
    font-size: 1rem;
    color: rgba(100, 100, 100, 1);

    @media screen and (min-width: 415px){
        display: flex;
    }
`;

const Flag = styled.img`
    width: 2.5rem,;
    height: 2.5rem;
`;

const Languages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    gap: .5rem;

    &:hover{
        cursor: pointer;
        color: black;
    }

    .arrow{
        transition: all 0.3s ease-in-out;
        fill: rgba(100, 100, 100, 1);
        transform: ${props => props.isModalActive ? "rotate(180deg)" : "rotate(0)"}
    }

    &:hover .arrow{
        fill: black;
    }
`;

const LanguagesList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: ${props => props.isModalActive ? "1" : "-1"};
    padding: ${props => props.isModalActive ? ".5rem" : "0"};
    opacity: ${props => props.isModalActive ? "1" : "0"};
    transform: ${props => props.isModalActive ? "translateY(0)" : "translateY(-1rem)"};
    overflow: hidden;
    width: 80%;
    background-color: white;
    transition: all .5s ease-in-out;
    border-radius: .5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    gap: .5rem;
    top: 3.2rem;
`;

const LanguagesItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: all .1s ease-in-out;

    &:hover{
        cursor: pointer;
        font-weight: bold;
        color: black;
    }
`;

const languages = [
    {
        id: 1,
        name: "English (US)",
        flag: USflag
    },
    {
        id: 2,
        name: "Português (BR)",
        flag: BRflag
    }
]

function ChangeLanguage() {
    const [language, setLanguage] = useState(languages[0].name);
    const [flag, setFlag] = useState(languages[0].flag);
    const [isModalActive, setIsModalActive] = useState(false);
    const modalRef = useRef();
    const ButtonRef = useRef();

    const handleLanguage = (id) => {
        return () => {
            const selectedLanguage = languages.find(lang => lang.id === id);
            setLanguage(selectedLanguage.name);
            setFlag(selectedLanguage.flag);
            setIsModalActive(false);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !ButtonRef.current.contains(event.target)) {
                setIsModalActive(false); 
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return(
        <LanguagesContainer>
            <Flag src={flag}/>

            <Languages ref={ButtonRef} isModalActive={isModalActive} onClick={() => setIsModalActive(prevState => !prevState)}>
                <p>{language}</p>
                <ArrowBottomSVG className="arrow"/>
            </Languages>

            <LanguagesList ref={modalRef} isModalActive={isModalActive}>
                {languages.map((lang, index) => {
                    return(
                        <LanguagesItem key={index}>
                            <p key={index} onClick={handleLanguage(lang.id)}>{lang.name}</p>
                        </LanguagesItem>
                    )
                })}
            </LanguagesList>

        </LanguagesContainer>
    )
}

export default ChangeLanguage;