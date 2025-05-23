    import { useEffect, useState } from "react";
    import { userAddList, userGetList } from "../../../../services/tdLists";
    import { ReactComponent as Trash } from "../../../../assets/Svg-Icons/Trash.svg";
    import { ReactComponent as Delete } from "../../../../assets/Svg-Icons/Delete.svg";
    import { useNotify } from "../../../../hooks/Notify/NotifyContext"; 
    import styled from "styled-components";
    import DotLoading from "../../../../components/DotLoading";
    import AddTaskModal from "../../../../components/AddTaskModal";
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
    const { addNotification } = useNotify();

    const fetchUserlist = async () => {
        try {
            setLoading(true);
            const response = await userGetList();
    
            setUserTdList(Array.isArray(response.list) ? response.list : []);
        } catch (error) {
            console.error(error.message);
            setUserTdList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserlist();
    }, []);

    const handleAddTask = async () => {
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
            const response = await userAddList({ newList: updatedTasks });

            if (response.success) {
                addNotification("Task add successfully.");
            } else{
                addNotification("Error to add task.");
            }
        } catch (error) {
            addNotification(error.message);
        }
    };    

    const handleCheckboxChange = async (taskId) => {
        const updatedTasks = userTdList.map(task => 
            task.id === taskId ? { ...task, done: !task.done } : task
        );

        setUserTdList(updatedTasks);

        try {
            const response = await userAddList({ newList: updatedTasks });

            if (response.success) {
                addNotification("Task marked as done.");
            } else{
                addNotification("Error updating task.");
            }
        } catch (error) {
            addNotification(error.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const updatedTasks = userTdList.filter(task => task.id !== taskId);
        setUserTdList(updatedTasks);

        try {
            const response = await userAddList({ newList: updatedTasks });

            if (response.success) {
                addNotification("Task deleted successfully.");
            } else{
                addNotification("Error deleting task.");
            }
        } catch (error) {
            addNotification(error.message);
        }
    };

    return (
        <SectionsContainer>
            {loading ? (
                <DotLoading />
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

            <AddTaskModal 
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