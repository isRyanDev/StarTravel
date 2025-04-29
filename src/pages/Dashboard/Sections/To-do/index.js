    import { useContext, useEffect, useState } from "react";
    import { userAddList, userGetList } from "../../../../services/tdLists";
    import styled from "styled-components";
    import Loading from "../../../../components/Loading";
    import { ReactComponent as Trash } from "../../../../assets/Svg-Icons/Trash.svg";
    import { ReactComponent as Delete } from "../../../../assets/Svg-Icons/Delete.svg";
    import AddModal from "../../../../components/AddModal";
    import { AuthContext } from "../../../../hooks/Authentication/AuthContext";
    import SectionsContainer from "../../../../components/SectionsContainer";
    import SectionsTopBar from "../../../../components/SectionsTopBar";

    const AddButton = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--secondary-color);
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: var(--dashboard-secondary-color);

        &:hover {
            cursor: pointer;
        }
    `;

    const TaskContainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

    const Task = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 1rem;
        padding: 1rem 2rem;
        color: ${props => props.checked ? "var(--secondary-color)" : "black"};
        border: 0.6px solid #D5D5D5;
        background: ${(props) => (props.checked ? "var(--dashboard-secondary-color)" : "#FBFCFF")};
        transition: all 0.3s ease-in-out;
    `;

    const TaskContent = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    `;

    const CheckboxContainer = styled.label`
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .custom-checkbox:checked + .checkmark {
            background-color: transparent;
            border: 1px solid white;
            box-shadow: 0 3px 7px rgba(33, 150, 243, 0.3);
        }

        .custom-checkbox:checked + .checkmark:after {
            display: block;
            animation: checkAnim 0.2s forwards;
        }

        @keyframes checkAnim {
            0% { height: 0; }
            100% { height: 10px; }
        }
    `;

    const CheckboxInput = styled.input`
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    `;

    const Checkmark = styled.span`
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 6px;
        border: 1px solid var(--dashboard-border-color);
        transition: background-color 0.5s;

        &:after {
            content: "";
            display: none;
            position: relative;
            top: -2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    `;

    const DeleteButton = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--secondary-color);
        padding: 1rem;
        border-radius: 0.5rem;

        &:hover {
            cursor: pointer;
        }
    `;

function ToDoSection() {
    const [userTdList, setUserTdList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const fetchUserlist = async () => {
        const username = user.username;
    
        try {
            setLoading(true);
            const response = await userGetList({ username });
    
            setUserTdList(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            setUserTdList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserlist();
    }, []);

    const handleAddTask = async () => {
        const username = user.username;

        if (!newTask.trim()) return;
    
        const newTaskObject = {
            id: userTdList.length + 1,
            content: newTask,
            done: false
        };
    
        const updatedTasks = [...userTdList, newTaskObject];
    
        setUserTdList(updatedTasks);
        setNewTask("");
        setShowModal(false); 
    
        try {
            await userAddList({ username: username, newList: updatedTasks });
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    };    

    const handleCheckboxChange = async (taskId) => {
        const username = user.username;

        const updatedTasks = userTdList.map(task => 
            task.id === taskId ? { ...task, done: !task.done } : task
        );

        setUserTdList(updatedTasks);

        try {
            await userAddList({ username: username, newList: updatedTasks });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const username = user.username;

        const updatedTasks = userTdList.filter(task => task.id !== taskId);
        setUserTdList(updatedTasks);

        try {
            await userAddList({ username: username, newList: updatedTasks });
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <SectionsContainer>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <SectionsTopBar>
                        <h1>To-Do List</h1>
                        <AddButton onClick={() => setShowModal(true)}>Add New Task</AddButton>
                    </SectionsTopBar>

                    <TaskContainer>
                        {userTdList.map((task) => (
                            <Task key={task.id} checked={task.done}>
                                <TaskContent>
                                    <CheckboxContainer>
                                        <CheckboxInput
                                            className="custom-checkbox"
                                            type="checkbox"
                                            checked={task.done}
                                            onChange={() => handleCheckboxChange(task.id)}
                                        />
                                        <Checkmark className="checkmark"></Checkmark>
                                    </CheckboxContainer>
                                    <p>{task.content}</p>
                                </TaskContent>
                                <DeleteButton onClick={() => handleDeleteTask(task.id)}>
                                    {task.done ? <Trash /> : <Delete />}
                                </DeleteButton>
                            </Task>
                        ))}
                    </TaskContainer>
                </>
            )}

            <AddModal 
                isOpen={showModal}
                setIsOpen={setShowModal}
                text={newTask}
                setText={setNewTask}
                title="Add New Task"
                subtitle="Please enter your task to continue."
                handleAddTask={handleAddTask}
            />

        </SectionsContainer>
    );
}

export default ToDoSection;