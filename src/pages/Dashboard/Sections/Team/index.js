import { useState, useEffect, useContext } from "react";
import { ReactComponent as Card } from "./card.svg";
import styled from "styled-components";
import Loading from "../../../../components/Loading";
import FormModal from "../../../../components/GroupModal";
import groups from "../../../../utils/groups.json";
import { ReactComponent as EditIcon } from "../../../../assets/Svg-Icons/EditIcon.svg";
import { AuthContext } from "../../../../utils/Authentication/AuthContext";
const { getUsers, getGroup } = require("../../../../services/userAccount");

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

const EditContainer = styled.div`
    display: ${(props) => (props.display || "none")};
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: .5rem;
    right: .5rem;
    cursor: pointer;
`

const Edit = styled(EditIcon)`
    width: 100%;
    height: 100%;
    stroke: var(--dashboard-secondary-color);
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

const AddButton = styled.div`
    display: ${(props) => (props.display || "none")};
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
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;

    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 900px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (min-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
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
    const [userPermissions, setUserPermissions] = useState([]);
    const [addMemberOpen, setAddMemberOpen] = useState(false);
    const [editMemberOpen, setEditMemberOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("Select");
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const id = user.id;
            const response = await getUsers(id);
            setUsers(response);

            const role = await getGroup();
            
            for(let i = 0; i < groups.length; i++) {
                if(groups[i].group === role.group) {
                    setUserPermissions(groups[i].permissions);
                }
            }

            setLoading(false);
        } catch (error) {
            console.log("Error fetching users:");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditMember = (member, group) => {
        setSelectedGroup(group);
        setSelectedMember(member);
        setEditMemberOpen(true);
    }

    return (
        <Container>
            {loading ? <Loading /> : 
                <TeamContainer>
                    <TeamTopBar>
                        <Title>Team</Title>
                        <AddButton display={userPermissions.includes("add-member") ? "flex" : "none"} onClick={() => setAddMemberOpen(true)}>Add New Member</AddButton>
                    </TeamTopBar>      

                    <UsersContainer>
                        {users.filter((user) => user.user_group !== "Customers").map((user) => (
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
                                
                                <EditContainer display={userPermissions.includes("edit-member") ? "flex" : "none"} onClick={() => handleEditMember(user.username, user.user_group)} >
                                    <Edit/>
                                </EditContainer>
                            </UserCardContainer>
                        ))}
                    </UsersContainer>

                    <FormModal
                        setIsOpen={setEditMemberOpen}
                        isOpen={editMemberOpen}
                        title="Edit member"
                        subtitle="Please enter the new group of the member to continue"
                        member={selectedMember}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        isEdit={true}
                        reqUsername={false}
                    />

                    <FormModal
                        setIsOpen={setAddMemberOpen}
                        isOpen={addMemberOpen}
                        title="New member"
                        subtitle="Please enter the new member's username and group to continue"
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        reqUsername={true}
                    />
                </TeamContainer>
            }
        </Container>   
    );
}

export default TeamSection;