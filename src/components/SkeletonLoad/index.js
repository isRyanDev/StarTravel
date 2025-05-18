import styled from "styled-components";

const SkeletonLoad = styled.div`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "100%"};
    border-radius: ${props => props.borderRadius || "1rem 1rem 0 0%"};
    background: linear-gradient(
      90deg,
      #eeeeee 25%,
      #dddddd 37%,
      #eeeeee 63%
    );
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;

    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: 200px 0;
      }
    }
`;

export default SkeletonLoad;