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
    position: absolute;
    z-index: ${props => props.isModalActive ? "1000" : "-1"};
    opacity: ${props => props.isModalActive ? "1" : "0"};
    transform: ${props => props.isModalActive ? "translateY(0)" : "translateY(-1rem)"};
    overflow: hidden;
    background-color: white;
    transition: all .5s ease-in-out;
    width: 100%;
    border-radius: .5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    top: 3.2rem;
`;

const Modal = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: .5rem 0;
    box-sizing: border-box;
`;

const ListTitle = styled.p`
    color: #404040;
    font-family: "Nunito Sans";
    font-size: 1rem;
    margin: 0 1rem .5rem 1rem;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(224, 224, 224, 1);
`;

const LanguagesItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    gap: 1.125rem;
    margin: 0 1rem;
    color: #404040;
    font-family: "Nunito Sans";
    font-size: 14px;
    font-weight: 600;

    &:hover{
        cursor: pointer;
        font-weight: bold;
        color: 700;
    }
`;

const languages = [
    {
        id: 1,
        name: "English",
        flag: USflag
    },
    {
        id: 2,
        name: "Português",
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

            <LanguagesList isModalActive={isModalActive} ref={modalRef}>
                <Modal>
                    <ListTitle isModalActive={isModalActive}>Select Language</ListTitle>
                    <Divider/>
                    {languages.map((lang, index) => {
                        return(
                            <LanguagesItem isModalActive={isModalActive} key={index} onClick={handleLanguage(lang.id)}>
                                <Flag src={lang.flag}/>
                                <p key={index}>{lang.name}</p>
                            </LanguagesItem>
                        )
                    })}
                </Modal>
            </LanguagesList>

        </LanguagesContainer>
    )
}

export default ChangeLanguage;