import { useEffect, useRef } from "react";
import styled from "styled-components";
import CardCustom from "../../assets/Images/icons/card-icon-custom.png";
import CardMic from "../../assets/Images/icons/card-icon-mic.png";
import CardPlane from "../../assets/Images/icons/card-icon-plane.png";
import CardWeather from "../../assets/Images/icons/card-icon-weather.png";
import CustomCursor from "../../assets/Images/custom-cursor.png";

const ServicesContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 2rem;
    margin-bottom: 8rem;
    opacity: 0;
    transform: translateX(-10rem);
    transition: transform 1s ease-in-out, opacity .5s ease-in-out; 
    min-height: ${(props) => props.height || "100vh"};

    &.active {
        opacity: 1;
        transform: translateX(0);
    }

    @media screen and (min-width: 1366px){
        gap: 0;
        margin-bottom: 0;
    }
`

const ServicesTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
`

const ServicesSubtitle = styled.h3`
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    color: var(--secondary-color);
    transition: all .7s;
`

const ServicesTitle = styled.h1`
    font-family: 'Volkhov', sans-serif;
    font-size: 4rem;
    color: var(--primary-color);
    transition: all .7s;
`

const ServicesContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const CardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
`

const CardList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    list-style: none;
    gap: 2rem;
    opacity: 1;

    @media screen and (min-width: 740px){
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 1366px){
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 1rem;
    }
`

const Card = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center; 
    width: 16.5rem;
    height: 20rem;
    border-radius: 2.25rem;
    background-color: var(--secondary-color);
    transition: all .7s ease-in-out;
    gap: 2rem;
    padding: 2rem;

    &:hover{
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        cursor: url(${CustomCursor}), auto;
    }
`

const CardImg = styled.img`
    width: 10rem;
`

const CardDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const CardTitle = styled.h1`
    font-family: 'Volkhov', sans-serif;
    font-size: 1.5rem;
    color: var(--primary-color);
`

const CardDescription = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: var(--primary-color);
`

function SectionServices({ height }){
        const servicesRef = useRef(null);
    
        useEffect(() => {
          const element = servicesRef.current;
        
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
                threshold: 0.4,
              }
            );
        
            observer.observe(element);
        
            return () => observer.disconnect();
          }
        }, []);

    return(
        <ServicesContainer ref={servicesRef} height={height}>
            {/* <div class="services-background-element">
                <img src="./assets/images/services-background-element.png" alt="services-ui-element"/>
            </div> */}

            <ServicesTitleContainer>
                <ServicesSubtitle>
                    CATEGORY
                </ServicesSubtitle>
                <ServicesTitle>
                    Best Services
                </ServicesTitle>
            </ServicesTitleContainer>

            {/* <div class="services-ui-element">
                <img id="services-ui-img" src="./assets/images/services-ui-element.png" alt="services-ui-element"/>
            </div> */}

            <ServicesContent>
                <CardContainer>
                    <CardList>
                        <Card>
                            <CardImg src={CardWeather} alt="card-icon-weather"/>
                            <CardDescriptionContainer>
                                <CardTitle>Calculated Weather</CardTitle>

                                <CardDescription>Built Wicket longer admire do barton vanity itself do in it.</CardDescription>
                            </CardDescriptionContainer>
                        </Card>

                        <Card>
                            <CardImg src={CardPlane} alt="card-icon-plane"/>
                            <CardDescriptionContainer>
                                <CardTitle>Best Flights</CardTitle>

                                <CardDescription>Engrossed listening. Park gate sell they west hard for the.</CardDescription>
                            </CardDescriptionContainer>
                        </Card>

                        <Card>
                            <CardImg src={CardMic} alt="card-icon-mic"/>
                            <CardDescriptionContainer>
                                <CardTitle>Local Events</CardTitle>

                                <CardDescription>Barton vanity itself do in it. Preferd to men it listening.</CardDescription>
                            </CardDescriptionContainer>
                        </Card>

                        <Card>
                            <CardImg src={CardCustom} alt="card-icon-custom"/>
                            <CardDescriptionContainer>
                                <CardTitle>Customization</CardTitle>

                                <CardDescription>We deliver outsourced aviation services for military customers</CardDescription>
                            </CardDescriptionContainer>
                        </Card>
                    </CardList>
                </CardContainer>
            </ServicesContent>
        </ServicesContainer>
    )
}

export default SectionServices