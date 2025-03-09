import { useEffect, useState } from "react";
import styled from "styled-components";

const NotifyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    position: absolute;
    top: 10vh;
    right: 1rem;
    max-height: 80vh;
    justify-content: center;
    z-index: 100;

    transform: ${(props) => (props.active ? "translateX(0)" : "translateX(25rem)")};
    transition: all 0.8s ease-in-out;
`;

const NotifyContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-color);
    font-family: "Nunito Sans";
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    width: 15rem;
    position: relative;
`;

const ProgressBar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    border-radius: 0 .5rem 0 .5rem;
    width: ${(props) => props.progress}%;
    background-color: var(--background);
    transition: width 0.1s linear;
`;

function Notify() {
    const [content, setContent] = useState(localStorage.getItem("notifyMessage"));
    const [active, setActive] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (content) {
            setTimeout(() => {
                setActive(true);
                setProgress(100);
            }, 200);

            const totalDuration = 5000;
            const intervalTime = 50;
            const decrement = (intervalTime / totalDuration) * 100;

            const interval = setInterval(() => {
                setProgress((prev) => Math.max(0, prev - decrement));
            }, intervalTime);

            setTimeout(() => {
                setActive(false);
                clearInterval(interval);

                setTimeout(() => {
                    setContent("");
                    localStorage.removeItem("notifyMessage");
                }, 2000);
            }, totalDuration);

            return () => clearInterval(interval);
        }
    }, [content, setActive, setProgress]);

    return (
        <NotifyContainer active={active}>

            <NotifyContent>
                {content}
                <ProgressBar progress={progress} />
            </NotifyContent>

        </NotifyContainer>
    );
}

export default Notify;