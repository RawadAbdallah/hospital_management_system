import { useState } from "react";

import Signin from "./forms/signin";
import Signup from "./forms/signup";

import "./index.css";

const Auth = () => {
    const [authPage, setAuthPage] = useState(true); //true = signin page - false = signup page
    const switchAuthPage = () => {
        setAuthPage(!authPage);
    };
    return (
        <div className="form-container">
            <div className="form-wrapper">
                {authPage ? 
                    <Signin switchToSignup={switchAuthPage} />
                  : 
                    <Signup switchToSignin={switchAuthPage} />
                }
            </div>
        </div>
    );
};

export default Auth;
