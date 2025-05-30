import { Button, Card } from "react-bootstrap";
import { register } from "../../api/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { REGISTER_FAILURE, REGISTER_SUCCESS } from "../../utils/constants";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePasswordMatched, setRePasswordMatched] = useState(false);
  const [isRepassSelected, setIsRepassSelected] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async() => {
    try {
      const payload = {
        userName,
        password,
        email,
        mobile
      }
      dispatch({type: "REGISTER_REQUEST"});
      const response = await register(payload);
      const data = await response?.json();
      console.log(data);
      dispatch({type: REGISTER_SUCCESS});
      navigate('/login');
    } catch (error) {
      dispatch({type: REGISTER_FAILURE, payload: error});
      console.log(error);
    }
  }
  
  const handleUserNameChange = (event) => {
    console.log(event.target.value);
    
    setUserName(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  }

  const checkPasswordMatched = (event) => {
    if(event?.target.value === password) {
      setRePasswordMatched(true);
    } else {
      setRePasswordMatched(false);
    }
  }
  return (
    <>
      <Card className="mx-auto w-50" >
      <Card.Title>
        Registration Form
      </Card.Title>
        <form className="grid">
            <div className="row">

            
          <div className="mb-3 col-6">
            <label htmlFor="UserName" className="form-label">
              UserName
            </label>
            <input type="text" className="form-control" id="UserName"  onChange={handleUserNameChange} />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="Password" onChange={handlePasswordChange} />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="reenter-passowrd" className="form-label" >
              Re-enter Password
            </label>
            <input
              type="password"
              className="form-control"
              id="reenter-passowrd"
              onChange={checkPasswordMatched}
              onFocus={() => setIsRepassSelected(true)}
            />
            {!rePasswordMatched && isRepassSelected? (<p>password mismatched</p>) : ""}
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input type="tel" className="form-control" id="mobile" onChange={handleMobileChange} />
          </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button type="button" variant="secondry">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default RegisterForm;
