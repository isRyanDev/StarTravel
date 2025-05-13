import styled from "styled-components";
import { useNotify } from "../../hooks/Notify/NotifyContext";
import NotificationItem from "./NotifyItem";

const NotifyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: fixed;
    top: 10vh;
    right: 10px;
    max-width: 20rem;
    z-index: 100;
`;

function Notify() {
    const { notifications, removeNotification } = useNotify();

    return (
        <NotifyContainer>
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    text={notification.text}
                    onRemove={removeNotification}
                />
            ))}
        </NotifyContainer>
    );
}

export default Notify;