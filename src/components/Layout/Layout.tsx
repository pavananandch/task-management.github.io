import { useContext } from "react";
import Header from "./header"
import { AuthContext } from "../../context/AuthContext";

const Layout = ({children}) => {
    const {state, setState} = useContext(AuthContext);
    const showHeader = state.isAuthenticated;
    return (
        <>
            {showHeader ? <Header /> : ""}
            {children}
        </>
    )
}

export default Layout;