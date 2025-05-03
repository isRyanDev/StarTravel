import { ReactComponent as Card } from "../../../../../assets/Svg-Icons/PriceCard.svg"
import styled from "styled-components";

const PlanContent = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-color);
    gap: 2.5rem;
    padding: 1rem 0;
    border-radius: 1.5rem;

    @media screen and (min-width: 1000px) and (min-height: 950px) {
        padding: 0;
    }
`

const PlanInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: .5rem;
    font-family: "Nunito Sans";
`

const PlanName = styled.h1`
    color: #202224;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: normal;
`

const Desc = styled.p`
    color: #212121;
    font-size: 1rem;
    font-weight: 400;
`

const Price = styled.h2`
    color: var(--dashboard-secondary-color);
    font-size: 2.875rem;
    font-weight: 800;
`

const Divider = styled.div`
    display: flex;
    width: 80%;
    height: 2px;
    opacity: 0.1;
    background: #212121;
`

const BenefitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.8rem;

    color: #212121;
    text-align: center;
    font-family: "Nunito Sans";
    font-size: 1.125rem;
    font-weight: 600;
`;

const BenefitName = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
`

const Include = styled.p`
    opacity: 1;
    color: #212121;
`

const NoInclude = styled.p`
    opacity: 0.5;
    color: #212121;
`

const StartedButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Nunito Sans";
    border-radius: 1.875rem;
    padding: 1.25rem 2.8rem;
    font-weight: bold;
    color: var(--dashboard-secondary-color);
    border: 2px solid var(--dashboard-secondary-color);
    transition: all 0.5s ease-in-out;
    z-index: 15;
    cursor: pointer;

    &:hover{
        background-color: var(--dashboard-secondary-color);
        color: var(--secondary-color);
    }
`

const PriceCard = styled(Card)`
    position: absolute;
`

function PlanElement({plan, benefits}){
    return(
        <PlanContent>
            <PriceCard/>

            <PlanInfo>
                <PlanName>{plan.name}</PlanName>
                <Desc>Monthly Charge</Desc>
                <Price>{plan.price}</Price>
            </PlanInfo>

            <Divider/>

            <BenefitsContainer>
                {benefits.filter(benefit => benefit.plans.includes(plan.name)).map((benefit, index) => (
                    <BenefitName key={index}>
                        <Include>{benefit.name}</Include>
                    </BenefitName>
                ))}

                {benefits.filter(benefit => !benefit.plans.includes(plan.name)).map((benefit, index) => (
                    <BenefitName key={index}>
                        <NoInclude>{benefit.name}</NoInclude>
                    </BenefitName>
                ))}
            </BenefitsContainer>

            <Divider/>

            <StartedButton>
                Get Started
            </StartedButton>

        </PlanContent>
    )
}

export default PlanElement