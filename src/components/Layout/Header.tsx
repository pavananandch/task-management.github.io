import { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { clearAll, getData } from "../../utils/storage";
import { LOGOUT_REQUEST } from "../../utils/constants";
import { useNavigate } from "react-router";

const Header = () => {
    const {state} = useContext(AuthContext);
    const {dispatch} = useContext(AuthContext);
    const {userName} = JSON.parse(getData('user'));
    const navigate = useNavigate();
    console.log(state.user);
    const handleLogout = () => {
        try {
            clearAll();
            dispatch({type: LOGOUT_REQUEST});
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar className="px-3">
                <Navbar.Brand>Task Management App</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <b>{state?.user?.userName || userName}</b>
                    </Navbar.Text>
                    <Navbar.Text className="ps-3 pointer" onClick={handleLogout}>
                        {"Logout >"}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header;