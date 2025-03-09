import { useEffect, useState } from "react"
import styled from "styled-components"
import Loading from "../../../../components/Loading"
import { userGetList } from "../../../../services/tdLists";

function ToDoSection(){
    const [userTdList, setUserTdList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserlist = async () => {
        const username = localStorage.getItem("username");

        try {
            setLoading(true);
            const response = await userGetList({username});
            setUserTdList(response);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUserlist();
    }, []);

    return(
        <>
            {loading ? <Loading /> : 
                <div>
                    {userTdList.map((list) => (
                        <div key={list.id}>
                            <h3>{list.id}</h3>
                            <p>{list.content}</p>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default ToDoSection