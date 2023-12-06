import { useState } from "react";
import sendRequest from "../../../core/helpers/request";
import { useNavigate } from 'react-router-dom';

const Signin = ({ switchToSignup }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prevCredentials) => {
      let newVal = e.target.value;
      if (e.target.type === 'email') {
        newVal = newVal.toLowerCase();
      }
      return { ...prevCredentials, [e.target.name]: newVal };
    });
  };

  const handleSubmit = async () => {
    const response = await sendRequest({
      body: credentials,
      route: "signin",
      method: "POST",
    });

    if (response.status === true) {
      localStorage.setItem('jwtToken', response.jwt);

      const userRole = response.role;
      navigate(`/dashboard/${userRole}`);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="form">
      <h1 className="form-title">Welcome Back</h1>
      <input
        className="form-input"
        type="email"
        name="email"  
        id="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        className="form-input"
        type="password"
        name="password"  
        id="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button
        className="form-button"
        type="button"
        onClick={() => handleSubmit()}
      >
        Sign in
      </button>
      <p className="form-footer">
        Don&apos;t have an account? <span onClick={() => switchToSignup()}>Sign up</span>
      </p>
    </div>
  );
};

export default Signin;
