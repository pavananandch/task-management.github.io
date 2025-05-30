import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
    const navigate = useNavigate();
    const {state, setState} = useContext(AuthContext);
    useEffect(() => {
        console.log({state})
        if(localStorage.getItem('token')) {
            navigate('/tasks');
        } else {
            navigate('/login');
        }
    })

    return (<></>)
}

export default HomePage;