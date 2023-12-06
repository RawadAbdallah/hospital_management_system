import { useState } from "react";
import sendRequest from "../../../core/helpers/request";

const Signup = ({ switchToSignin }) => {
    const [role, setRole] = useState("patient");
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        age: null,
        gender: "",
        role: "",
        emergency_status: false,
        health_condition: null,
        speciality: null,
    });

    const handleChange = (e) => {
        if (e.target.name === "role") {
            setRole(e.target.value);
        }

        setCredentials((prevCredentials) => {
            return {
                ...prevCredentials,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async () => {
      console.log(credentials)

        const response = await sendRequest({
            route: "signup",
            body: credentials,
            method: "POST",
        });
        console.log(response);

        if (response.status == true) {
            setCredentials({
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                age: null,
                gender: "",
                role: "",
                emergency_status: false,
                health_condition: null,
                speciality: null,
            });
            alert(response.message)
            switchToSignin();
          } else {
            alert(response.message)
          }
    };

    return (
        <div className="form">
            <h1 className="form-title">Join Us</h1>
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

            <input
                className="form-input"
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                onChange={handleChange}
            />
            <input
                className="form-input"
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                onChange={handleChange}
            />

            <select name="role" id="role" onChange={handleChange}>
                <option value={null}>Select Role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
            </select>

            <select name="gender" id="gender" onChange={handleChange}>
                <option value={null}>Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            {role === "patient" && (
                <>
                    <input
                        className="form-input"
                        type="text"
                        name="health_condition"
                        id="health-condition"
                        placeholder="Health Condition"
                        onChange={handleChange}
                    />
                    <div className="radio-wrapper">
                        <p>Is it an emergency?</p>
                        <div>
                            <label htmlFor="yes">Yes</label>
                            <input
                                type="radio"
                                name="emergency_status"
                                id="yes"
                                value={true}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="no">No</label>
                            <input
                                type="radio"
                                name="emergency_status"
                                id="no"
                                value={false}
                                defaultChecked
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </>
            )}

            {role === "doctor" && (
                <>
                    <input
                        className="form-input"
                        type="text"
                        name="speciality"
                        id="speciality"
                        placeholder="Speciality"
                        onChange={handleChange}
                    />
                </>
            )}

            <input
                className="form-input"
                type="number"
                name="age"
                id="age"
                placeholder="Age"
                min={0}
                max={99}
                step={1}
                onChange={handleChange}
            />

            <button
                className="form-button"
                type="button"
                onClick={() => handleSubmit()}
            >
                Sign up
            </button>
            <p className="form-footer">
                Already have an account?{" "}
                <span onClick={() => switchToSignin()}>Sign in</span>{" "}
            </p>
        </div>
    );
};

export default Signup;
