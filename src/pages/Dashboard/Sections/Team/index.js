import { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "../../../../components/Loading";
import { ReactComponent as Card } from "./card.svg";
import FormModal from "../../../../utils/FormModal";
const { getUsers } = require("../../../../services/userAccount");

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 92%;
    width: 100%;
    gap: 2.3rem;
    font-family: 'Nunito Sans', sans-serif;
`;

const TeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2.3rem 1.8rem;
`

const TeamTopBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

const AddButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--secondary-color);
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--dashboard-secondary-color);

    &:hover{
        cursor: pointer;
    }
`

const UsersContainer = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    width: 100%;
`;

const UserCard = styled(Card)`
    position: absolute;
`;

const UserCardContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    overflow: hidden;
    padding: 1.5rem;
    background-color: var(--secondary-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const User = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Nunito Sans', sans-serif;
    gap: .5rem;
    z-index: 2;
`

const ProfileImg = styled.img`
    width: 8rem;
    transition: all 0.3s ease-in-out;
`;

function TeamSection() {
    const [loading, setLoading] = useState(false);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        setFormIsOpen(true);
    };

    return (
        <Container>
            {loading ? <Loading /> : 
                <TeamContainer>
                    <TeamTopBar>
                        <Title>Team</Title>
                        <AddButton onClick={handleAddUser}>Add New Member</AddButton>
                    </TeamTopBar>      

                    <UsersContainer>
                        {users.filter((user) => user.user_group !== "Client").map((user) => (
                            <UserCardContainer key={user.id}>
                                <UserCard/>

                                <User>
                                    <ProfileImg 
                                        src={`/profile/${user.user_profile}.png`} 
                                        alt={`Profile`} 
                                    />
                                    <p><strong>{user.username}</strong></p>
                                    <p>{user.user_group}</p>
                                    <p>{user.email}</p>
                                </User>
                            </UserCardContainer>
                        ))}
                    </UsersContainer>

                    <FormModal setIsOpen={setFormIsOpen} isOpen={formIsOpen}/>
                </TeamContainer>
            }
        </Container>   
    );
}

export default TeamSection;