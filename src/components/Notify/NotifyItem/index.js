import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const NotifyContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--secondary-color);
    font-family: "Nunito Sans";
    border-radius: 0.5rem;
    padding: 1rem;
    width: 15rem;
    position: relative;
    transform: ${({ active }) => (active ? "translateX(0)" : "translateX(120%)")};
    transition: transform 0.5s ease-in-out;
`;

const ProgressBar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    border-radius: 0 0.5rem 0 0.5rem;
    width: ${({ progress }) => progress}%;
    background-color: var(--background);
    transition: width 0.1s linear;
`;

function NotificationItem({ id, text, duration = 5000, onRemove }) {
    const [active, setActive] = useState(false);
    const [progress, setProgress] = useState(100);
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        const activateTimeout = setTimeout(() => {
            setActive(true);
        }, 100);

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(newProgress);
            if (newProgress <= 0) {
                clearInterval(interval);
                setActive(false);
                setTimeout(() => {
                    onRemove(id);
                }, 500);
            }
        }, 50);

        return () => {
            clearTimeout(activateTimeout);
            clearInterval(interval);
        };
    }, [id, duration, onRemove]);

    return (
        <NotifyContent active={active}>
            {text}
            <ProgressBar progress={progress} />
        </NotifyContent>
    );
}

export default NotificationItem;