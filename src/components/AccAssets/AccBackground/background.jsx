import { useRef, useEffect } from "react";
import styled from "styled-components";

const BackgroundContainer = styled.div`
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 1;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const TLContainer = styled.div`
    position: absolute;
    height: 60%;
    max-width: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translate(-10rem, -10rem);
    transition: transform .8s ease-in-out, opacity 1s ease-in-out;
    z-index: 1;

    &.active {
        transform: translate(0);
        opacity: 1;
    }
`;

const TRContainer = styled.div`
    position: absolute;
    height: 50%;
    max-width: 100%;
    top: 0;
    right: 0;
    opacity: 0;
    transform: translate(+10rem, -10rem);
    transition: transform 1s ease-in-out, opacity 1s ease-in-out;
    z-index: 1;

    &.active {
        transform: translate(0);
        opacity: 1;
    }
`;

const BLContainer = styled.div`
    position: absolute;
    height: 65%;
    max-width: 100%;
    bottom: 0;
    left: 0;
    opacity: 0;
    transform: translate(-10rem, +10rem);
    transition: transform 1.2s ease-in-out, opacity 1s ease-in-out;
    z-index: 1;

    &.active {
        transform: translate(0);
        opacity: 1;
    }
`;

const BRContainer = styled.div`
    position: absolute;
    height: 70%;
    max-width: 100%;
    bottom: 0;
    right: 0;
    opacity: 0;
    transform: translate(+10rem, +10rem);
    transition: transform 1.4s ease-in-out, opacity 1s ease-in-out;
    z-index: 1;

    &.active {
        transform: translate(0);
        opacity: 1;
    }
`;

function Background() {
    const backgroundRef = useRef(null);
    const tlRef = useRef(null);
    const trRef = useRef(null);
    const blRef = useRef(null);
    const brRef = useRef(null);

    useEffect(() => {
        const backgroundElement = backgroundRef.current;
        const tlElement = tlRef.current;
        const trElement = trRef.current;
        const blElement = blRef.current;
        const brElement = brRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    tlElement.classList.add("active");
                    trElement.classList.add("active");
                    blElement.classList.add("active");
                    brElement.classList.add("active");
                } else {
                    tlElement.classList.remove("active");
                    trElement.classList.remove("active");
                    blElement.classList.remove("active");
                    brElement.classList.remove("active");
                }
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        if (backgroundElement) observer.observe(backgroundElement);

        return () => {
            if (backgroundElement) observer.unobserve(backgroundElement);
        };
    }, []);

    return (
        <BackgroundContainer ref={backgroundRef}>
            <TLContainer ref={tlRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="821" height="611" viewBox="0 0 821 611" fill="none">
                    <path
                        opacity="0.6"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M219.512 -233.946C-12.7303 -149.417 -132.476 107.378 -47.9461 339.62C-2.75693 463.777 259.396 251.791 372.979 297.623C471.861 337.522 417.534 646.419 525.62 607.079C757.863 522.55 877.608 265.755 793.079 33.5125C708.549 -198.73 451.755 -318.475 219.512 -233.946Z"
                        fill="#568AFF"
                    />
                </svg>
            </TLContainer>

            <TRContainer ref={trRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="584" height="396" viewBox="0 0 584 396" fill="none">
                    <path
                        opacity="0.541829"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.46902 -208.915C-41.4966 74.4538 147.714 344.675 431.083 394.64C582.571 421.352 521.438 33.6298 633.769 -54.2125C731.56 -130.685 1011.38 103.907 1034.64 -27.9738C1084.6 -311.343 895.393 -581.564 612.025 -631.529C328.656 -681.495 58.4346 -492.284 8.46902 -208.915Z"
                        fill="#568AFF"
                    />
                </svg>
            </TRContainer>

            <BLContainer ref={blRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="720" height="585" viewBox="0 0 720 585" fill="none">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M272.5 895C519.647 895 720 694.647 720 447.5C720 315.376 401.153 424.916 310.095 343C230.823 271.687 387.523 0 272.5 0C25.3526 0 -175 200.353 -175 447.5C-175 694.647 25.3526 895 272.5 895Z"
                        fill="#568AFF"
                    />
                </svg>
            </BLContainer>

            <BRContainer ref={brRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="575" height="706" viewBox="0 0 575 706" fill="none">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1141.38 667.96C1196.52 355.221 987.699 56.9921 674.96 1.84774C507.77 -27.6323 575.24 400.276 451.267 497.223C343.34 581.622 34.5121 322.715 8.8477 468.264C-46.2967 781.004 162.525 1079.23 475.264 1134.38C788.004 1189.52 1086.23 980.699 1141.38 667.96Z"
                        fill="#568AFF"
                    />
                </svg>
            </BRContainer>
        </BackgroundContainer>
    );
}

export default Background;