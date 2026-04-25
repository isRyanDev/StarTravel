import styled from "styled-components"
import SectionsContainer from "../../../../components/SectionsContainer"
import SectionsTopBar from "../../../../components/SectionsTopBar"
import PlanElement from "./Plans"

const PlansContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    overflow: hidden;

    @media screen and (min-width: 1000px) and (min-height: 950px) {
        grid-template-columns: 1fr 1fr 1fr;
        height: 100%;
    }

    @media screen and (min-width: 1000px) and (max-height: 950px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`

function PricingSection(){
    const plans = [
        {
            name: "Basic",
            price: "$14.99",
        },
        {
            name: "Standard",
            price: "$49.99",
        },
        {
            name: "Premium",
            price: "$89.99",
        }
    ]

    const benefits = [
        {
            name: "Free Setup",
            plans: ["Basic", "Standard", "Premium"]
        },
        {
            name: "Bandwidth Limit 10 GB",
            plans: ["Basic", "Standard", "Premium"]
        },
        {
            name: "20 User Connection",
            plans: ["Basic", "Standard", "Premium"]
        },
        {
            name: "Analytics Report",
            plans: ["Standard", "Premium"]
        },
        {
            name: "Public API Access",
            plans: ["Standard", "Premium"]
        },
        {
            name: "Plugins Intregation",
            plans: ["Premium"]
        },
        {
            name: "Custom Content Management",
            plans: ["Premium"]
        }
    ]

    return(
        <SectionsContainer>
            <SectionsTopBar>
                <h1>Pricing</h1>
            </SectionsTopBar>

            <PlansContainer>

                <PlanElement plan={plans[0]} benefits={benefits}/>
                <PlanElement plan={plans[1]} benefits={benefits}/>
                <PlanElement plan={plans[2]} benefits={benefits}/>

            </PlansContainer>
        </SectionsContainer>    
    )
}

export default PricingSection