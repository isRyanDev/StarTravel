import { useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header/header";
import SectionServices from "../../utils/Sections/services";
import Footer from "../../components/Footer/footer";

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`

function Services() {
  useEffect(() => {
    document.title = "Star Travel | Services";   
    localStorage.removeItem("currentSection"); 
  }, []);

  return (
    <ServicesContainer>
      <Header />

      <SectionServices height={"90vh"} />

      <Footer/>
    </ServicesContainer>
  );
}

export default Services;
