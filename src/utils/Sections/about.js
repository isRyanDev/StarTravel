import { ReactComponent as ArrowImg } from "../../assets/Svg-Icons/ArrowTopRight.svg"
import { useRef, useEffect } from "react";
import styled from "styled-components";
import TravelerImg from "../../assets/traveler-icon.png"

const AboutContainer = styled.section`
    display: flex;  
    flex-direction: column;
    align-items: center;
    height: 90vh;
    width: 100vw;
    transform: translateX(-10rem);
    opacity: 0;
    transition: transform 1s ease-in-out, opacity .5s ease-in-out;

    &.active {
        transform: translateX(0);
        opacity: 1;
    }
`

const AboutContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const AboutContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-family: 'Manrope', sans-serif;
    max-width: 90%;
    gap: 2rem;
    font-size: 2rem;

    @media screen and (min-width: 636px){
        max-width: unset;
        text-align: left;
        align-items: left;
    }
`

const AboutTexts = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;

    @media screen and (min-width: 636px){
        width: 30rem;
    }
`

const AboutSubTitle = styled.h2`
    display: none;

    @media screen and (min-width: 1640px){
        display: flex;
        font-family: 'Poppins', sans-serif;
        color: var(--secondary-color);
        font-size: 1.2rem;
        transition: all .7s;
    }
`

const AboutTitle = styled.h1`
    font-family: 'Volkhov', sans-serif;
    font-weight: bold;
    font-size: 2rem;
    color: var(--primary-color);
    transition: all .7s;

    @media screen and (min-width: 636px){
        font-size: 3rem;
    }
`

const AboutDescription = styled.p`
    display: flex;
    font-family: 'Poppins', sans-serif;
    color: var(--secondary-color);
    font-weight: 500;
    font-size: 1rem;
    transition: all .7s;
    justify-content: left;
    align-items: center;
    gap: 2rem;
`

const AboutButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2rem;

    @media screen and (min-width: 636px){
        justify-content: left;
    }
`

const AboutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: solid var(--primary-color) 1px;
    border-radius: .5rem;
    background-color: transparent;
    color: var(--primary-color);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all .7s;

    &:hover{
        background-color: var(--primary-color);
        color: var(--secondary-color);
    }

    &:hover .arrow-svg{
        fill: var(--secondary-color);
    }
`

const Arrow = styled(ArrowImg)`
    height: 1rem;
    width: 1rem;
    transition: all .7s;
    fill: var(--primary-color);
`

const TravelerContainer = styled.div`
    max-width: 50%;
`

const Traveler = styled.img`
    display: none;

    @media screen and (min-width: 1640px){
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40rem;
    }
`

function SectionAbout() {
    const aboutRef = useRef(null);

    useEffect(() => {
      const element = aboutRef.current;
    
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              element.classList.add("active");
            } else {
              element.classList.remove("active");
            }
          },
          {
            root: null,
            threshold: 0.2,
          }
        );
    
        observer.observe(element);
    
        return () => observer.disconnect();
      }
    }, []);

    return (
        <AboutContainer ref={aboutRef}>
            <AboutContentContainer>
                <AboutContent>
                    <AboutTexts>                    
                        <AboutSubTitle>
                            BEST DESTINATIONS AROUND THE WORLD!
                        </AboutSubTitle>
                        <AboutTitle>
                            Travel, enjoy<br/> and live a new<br/> and full life.
                        </AboutTitle>
                        <AboutDescription>
                            At Star Travel, we turn your travel dreams into reality. We offer personalized packages to amazing destinations, with the care and attention you deserve. Traveling with Star makes every moment unforgettable!
                        </AboutDescription>
                    </AboutTexts>

                    <AboutButtonsContainer>                    
                        <AboutButton className="buy-button">
                            Purchase
                            <Arrow className="arrow-svg"/>
                        </AboutButton>

                        <AboutButton>
                            Find out more
                        </AboutButton>
                    </AboutButtonsContainer>


                </AboutContent>

                <TravelerContainer>
                    <Traveler src={TravelerImg} alt="traveler icon"/>
                </TravelerContainer>
            </AboutContentContainer>
        </AboutContainer>
    );
}

export default SectionAbout;