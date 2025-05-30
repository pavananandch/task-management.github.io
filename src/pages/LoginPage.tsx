import { Card } from "react-bootstrap";
import LoginForm from "../components/Auth/LoginForm";
import { useEffect } from "react";
import { getData } from "../utils/storage";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = getData('token');
    if(isAuthenticated) {
        navigate('/home');
    }
  })
  return (
    <>
      <Card className="w-25 mx-auto mt-5">
        <Card.Title className="pb-3">Login</Card.Title>
        <LoginForm />
      </Card>
    </>
  );
};

export default LoginPage;
