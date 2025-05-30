import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from "./Header";

const Layout = ({children}) => {
    const { state } = useContext(AuthContext);
    const showHeader = state.isAuthenticated;
    return (
        <>
            {showHeader ? <Header /> : ""}
            {children}
        </>
    )
}

export default Layout;