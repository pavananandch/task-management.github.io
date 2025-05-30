import { SetStateAction, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router";
import { login } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN_REQUEST, LOGIN_SUCCESS } from "../../utils/constants";
import { setData } from "../../utils/storage";

const LoginForm = () => {
      const { dispatch } = useContext(AuthContext);
      const [userName, setUserName] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
      const handleUserNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUserName(event.target.value);
      };
      const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
      };

      const handleSubmit = async () => {
        try {
          dispatch({type: LOGIN_REQUEST});
          const response = await login(userName, password);
          const {token, user} = await response.json();
          if(response.ok) {
            setData('token', token);
            setData('user',   JSON.stringify(user));
            dispatch({type: LOGIN_SUCCESS, payload: {token, user}});
            navigate('/home');
          } else {
            new Error(response.statusText);
          }
        } catch (error) {
          console.log(error);
        }
      }
    return (
        <>
         <Form className="text-start">
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" value={userName} onChange={handleUserNameChange} placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check className="w-50 d-inline" type="checkbox" label="Remember me" />
            <span className="w-20 ms-5 d-inline float-end"><Link to="/register">Sign Up</Link></span>
          </Form.Group>
        </Form>
            <Button className="mx-auto w-50" variant="primary" onClick={handleSubmit}>
            Login
          </Button>
        </>
    )
}

export default LoginForm;