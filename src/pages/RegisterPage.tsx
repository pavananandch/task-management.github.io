import { Link } from "react-router";
import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
    return (
        <>
            <RegisterForm />
            <p className="mt-3">Already registerd? <Link to="/login">click here</Link> to login</p>
        </>
    )
}

export default RegisterPage;