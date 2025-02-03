import { useRef, useEffect } from "react";
import styled from "styled-components";
import EuropeImg from "../../assets/Images/europe-card.png";
import RomeImg from "../../assets/Images/rome-card.png";
import LondonImg from "../../assets/Images/london-card.png";
import CustomCursor from "../../assets/Images/custom-cursor.png"
import Arrow from "../../assets/Images/destinations-arrow.png";

const DestinationsContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;
    margin-bottom: 8rem;
    min-height: 100vh;
    transform: translateX(-10rem);
    opacity: 0;
    transition: transform 1s ease-in-out, opacity .5s ease-in-out; 

    &.active {
        transform: translateX(0);
        opacity: 1;
    }

    @media screen and (min-width: 1640px){
        min-height: ${props => props.height || "100vh"};	
        gap: 0rem;
        margin-bottom: 0;
    }
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
`

const Subtitle = styled.h3`
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    color: var(--secondary-color);
    transition: all .7s;
`

const Title = styled.h1`
    font-family: 'Volkhov', sans-serif;
    font-size: 2rem;
    color: var(--primary-color);
    transition: all .7s;

    @media screen and (min-width: 1640px){
        font-size: 4rem;
    }
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 200;
`

const CardContentContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: space-between;
    border-radius: 2.25rem;
    transition: all .7s ease-in-out;
`

const CardListContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;
    list-style: none;
    opacity: 1;

    @media screen and (min-width: 1640px){
        grid-template-columns: 1fr 1fr 1fr;
        gap: 5rem;
    }
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: space-between;
    border-radius: 2.25rem;
    transition: all .7s ease-in-out;

    &:hover{
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        cursor: url(${CustomCursor}), auto;
    }
`

const CardImg = styled.img`
    width: 20rem;
    border-radius: 2.25rem 2.25rem 0 0;
`

const CardTextsContainer = styled.div`
    width: 16rem;
    border-radius: 0 0 2.25rem 2.25rem;
    background-color: var(--secondary-color);
    color: #5E6282;
    padding: 2rem;
`

const CardLocation = styled.div`
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const CardTimeTravel = styled.div`
    font-family: 'Poppins', sans-serif;
    font-weight: 1rem;
    display: flex;
    flex-direction: row;
    gap: .5rem;
`

const CardTimeImg = styled.img`
    width: 1.5rem;
`

function SectionDestinations({ height }) {
    const destinationsRef = useRef(null);

    useEffect(() => {
      const element = destinationsRef.current;
    
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
        <DestinationsContainer ref={destinationsRef} height={height}>
            {/* <div class="destinations-ui-element">
                <img id="destinations-ui-img" src="./assets/images/destinations-ui-element.png" alt="services-ui-element"/>
            </div> */}

            <TitleContainer>
                <Subtitle>
                    TOP SELLING
                </Subtitle>
                <Title>
                    Top Destinations
                </Title>
            </TitleContainer>

            <ContentContainer>
                <CardContentContainer>
                    <CardListContainer>
                        <CardContainer>
                            <CardImg src={RomeImg} alt="rome-img"/>
                            <CardTextsContainer>
                                <CardLocation>
                                    <p>
                                        Rome, Italy
                                    </p>
                                    <p>
                                        $5,42k
                                    </p>
                                </CardLocation>
                                <CardTimeTravel>
                                    <CardTimeImg src={Arrow} alt="destinations-arrow"/>
                                    <p>
                                        10 Days trip
                                    </p>
                                </CardTimeTravel>
                            </CardTextsContainer>
                        </CardContainer>
                        <CardContainer>
                            <CardImg src={LondonImg} alt="rome-card"/>
                            <CardTextsContainer>
                                    <CardLocation>
                                        <p>
                                            London, UK
                                        </p>
                                        <p>
                                            $4,2k
                                        </p>
                                    </CardLocation>
                                    <CardTimeTravel>
                                        <CardTimeImg src={Arrow} alt="destinations-arrow"/>
                                        <p>
                                            12 Days trip
                                        </p>
                                    </CardTimeTravel>
                            </CardTextsContainer>
                        </CardContainer>
                        <CardContainer>
                            <CardImg src={EuropeImg} alt="europe-card"/>
                            <CardTextsContainer>
                                    <CardTimeTravel>
                                        <p>
                                            Full Europe
                                        </p>
                                        <p>
                                            $28 Days trip
                                        </p>
                                    </CardTimeTravel>
                                    <CardTimeTravel>
                                        <CardTimeImg src={Arrow} alt="destinations-arrow"/>
                                        <p>
                                            10 Days trip
                                        </p>
                                    </CardTimeTravel>
                            </CardTextsContainer>
                        </CardContainer>
                    </CardListContainer>
                </CardContentContainer>
            </ContentContainer>
        </DestinationsContainer>
    )
}

export default SectionDestinations