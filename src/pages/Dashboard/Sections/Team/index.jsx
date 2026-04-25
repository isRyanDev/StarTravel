import { useState, useEffect } from "react";
import { ReactComponent as Card } from "../../../../assets/Svg-Icons/TeamCard.svg";
import styled from "styled-components";
import DotLoading from "../../../../components/DotLoading";
import { ReactComponent as EditIcon } from "../../../../assets/Svg-Icons/EditIcon.svg";
import SectionsContainer from "../../../../components/SectionsContainer";
import SectionsTopBar from "../../../../components/SectionsTopBar";
import { addTeam, getGroups, updateGroup, userPermissions } from "../../../../services/user_groups";
import SkeletonLoad from "../../../../components/SkeletonLoad";
import TextInput from "../../../../components/Inputs/TextInput";
import SelectInput from "../../../../components/Inputs/Select";
import FormModal from "../../../../components/FormModal";
import { useApiResponse } from "../../../../hooks/ApiResponse/ApiContext";
import { useNotify } from "../../../../hooks/Notify/NotifyContext";
const { getUsers } = require("../../../../services/users");

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

const Username = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 1px solid #D8D8D8;
    color: var(--login-text-color);
    font-family: "Nunito Sans";
    font-size: 1.125rem;
    padding: 1rem;
    background: #F1F4F9;
`

function TeamSection() {
    const { addNotification} = useNotify();
    const { setApiResponse, setApiResponseColor } = useApiResponse();
    const [loading, setLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [userPerms, setUserPerms] = useState([]);
    const [imgLoad, setImgLoad] = useState(true);
    const [username, setUsername] = useState("");
    const [addMemberOpen, setAddMemberOpen] = useState(false);
    const [editMemberOpen, setEditMemberOpen] = useState(false);
    const [memberSelected, setMemberSelected] = useState("");
    const [memberSelectedGroup, setMemberSelectedGroup] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [groupsList, setGroupsList] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const responseUsers = await getUsers();
            setUsers(responseUsers.users);

            const responsePerms = await userPermissions();
            setUserPerms(responsePerms.permissions);

            setLoading(false);
        } catch (error) {
            console.log("Error fetching users:");
        }
    };

    async function fetchGroups() {
        try {
            const response = await getGroups();
            
            setGroupsList(response.groups);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    useEffect(() => {
        if(!addMemberOpen && !editMemberOpen){
            setApiResponse("");
            setApiResponseColor("");
            setUsername("");
            setSelectedGroup("");
            setMemberSelected("");
            setMemberSelectedGroup("");
        }
    }, [addMemberOpen, editMemberOpen, setApiResponse, setApiResponseColor]);

    const handleEditMember = (member, group) => {
        setMemberSelectedGroup(group);
        setMemberSelected(member);
        setEditMemberOpen(true);
    }

    async function addTeamMember(){
        setModalLoading(true);

        if (!username || !selectedGroup || selectedGroup === "Select") {
            setApiResponseColor("red");
            setApiResponse("Please fill in all fields.");
            setModalLoading(false);
            return;
        }

        try {
            const response = await addTeam({
                "username": username,
                "group": selectedGroup
            });
            
            if(response.success){
                addNotification(response.message);
                setAddMemberOpen(false);
                fetchUsers();
            }
            else{
                setApiResponseColor("red");
                setApiResponse(response.message);
                setModalLoading(false);
                return;
            }
        } catch (error) {
            setApiResponseColor("red");
            setApiResponse(error.message);
            return;
        }

        setModalLoading(false);
    }

    async function editTeamMember() {
        setModalLoading(true);

        if (!memberSelected || !memberSelectedGroup || memberSelectedGroup === "Select") {
            setApiResponseColor("red");
            setApiResponse("Please fill in all fields.");
            setModalLoading(false);
            return;
        }

        try {
            const response = await updateGroup({
                "username": memberSelected,
                "group": memberSelectedGroup
            });

            if(response.success){
                addNotification(response.message);
                setEditMemberOpen(false);
                fetchUsers();
            }
            else{
                setApiResponseColor("red");
                setApiResponse(response.message || "An error occurred.");
                setModalLoading(false);
                return;
            }
        } catch (error) {
            setApiResponseColor("red");
            setApiResponse(error.message || "An error occurred.");
            setModalLoading(false);
            return;
        }

        setModalLoading(false);
    }

    const addMemberInputs = [
        {
            label: "Username",
            component:  <TextInput value={username} setText={setUsername} type={"text"} placeholder={"New member"}/>
        },
        {
            label: "Group",
            component:  <SelectInput list={groupsList.filter((group) => group.name !== "Customers")} selectedOption={selectedGroup} setSelectedOption={setSelectedGroup}/>
        }
    ]

    const editMemberInputs = [
        {
            label: "Username",
            component: <Username><p>{memberSelected}</p></Username>
        },
        {
            label: "Group",
            component:  <SelectInput list={groupsList} selectedOption={memberSelectedGroup} setSelectedOption={setMemberSelectedGroup}/>
        }
    ]

    return (
        <SectionsContainer>
            {loading ? <DotLoading /> : 
                <>
                    <SectionsTopBar>
                        <h1>Team</h1>
                        <AddButton display={userPerms.includes("add-member") ? "flex" : "none"} onClick={() => setAddMemberOpen(true)}>Add New Member</AddButton>
                    </SectionsTopBar>      

                    <UsersContainer>
                        {users.filter((user) => user.user_group !== "Customers").map((user) => (
                            <UserCardContainer key={user.id}>
                                <UserCard/>
                                <User>
                                    {imgLoad && <SkeletonLoad width="8rem" height="8rem" borderRadius="50%"/>}
                                    <ProfileImg 
                                        src={`/profile/${user.user_profile}.png`} 
                                        alt={`Profile`} 
                                        onLoad={() => setImgLoad(false)}
                                        style={{display: imgLoad ? "none" : "block"}}
                                    />
                                    <p><strong>{user.username}</strong></p>
                                    <p>{user.user_group}</p>
                                    <p>{user.email}</p>
                                </User>

                                <EditContainer display={userPerms.includes("edit-member") ? "flex" : "none"} onClick={() => handleEditMember(user.username, user.user_group)} >
                                    <Edit/>
                                </EditContainer>
                            </UserCardContainer>
                        ))}
                    </UsersContainer>

                    <FormModal
                        isOpen={addMemberOpen}
                        setIsOpen={setAddMemberOpen}
                        title="New member"
                        subtitle="Please enter the new member's username and group to continue"
                        inputs={addMemberInputs}
                        loading={modalLoading}
                        action={addTeamMember}
                    />

                    <FormModal
                        isOpen={editMemberOpen}
                        setIsOpen={setEditMemberOpen}
                        title="Edit member"
                        subtitle="Please enter the new group of the member to continue"
                        inputs={editMemberInputs}
                        loading={modalLoading}
                        action={editTeamMember}   
                    />
                </>
            }
        </SectionsContainer>   
    );
}

export default TeamSection;