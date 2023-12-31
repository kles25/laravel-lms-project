import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContexProvider";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const [selectedRole, setSelectedRole] = useState("admin");
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();

    const { token, setUser, setToken, updateUser } = useStateContext();

    useEffect(() => {
        if (token) {
            // If user is already logged in, show the loader before navigating
            setShowLoader(true);

            const timer = setTimeout(() => {
                setShowLoader(false); // Hide loader after 5 seconds
                navigate("/");
            }, 5000); // 5 seconds delay

            return () => clearTimeout(timer); // Clear timeout on unmounting or change
        }
    }, [token, navigate]);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            role: selectedRole,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.token);
                setToken(data.token);
                updateUser(data.user, data.user.role);

                if (data.user.role === "admin") {
                    navigate("/admin");
                } else if (data.user.role === "teacher") {
                    navigate("/teacher");
                } else if (data.user.role === "student") {
                    navigate("/student");
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    return (
        <>
            {showLoader && (
                <div className="animate-cube-holder-two">
                    <div className="loader"></div>
                </div>
            )}
            {!showLoader && (
                <div className="form-container">
                    <div className="pages-row">
                        <div className="pages-col-5">
                            <form className="form-holder" onSubmit={onSubmit}>
                                <div className="form-input">
                                    <label>Full Name</label>
                                    <input
                                        ref={nameRef}
                                        type="text"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="form-input">
                                    <label>Email</label>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-input">
                                    <label>Password</label>
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="form-input">
                                    <label>Confrim Password</label>
                                    <input
                                        ref={passwordConfirmationRef}
                                        type="password"
                                        placeholder="Confrim Password"
                                    />
                                </div>
                                <div className="form-input">
                                    <label>Select Role:</label>
                                    <select
                                        value={selectedRole}
                                        onChange={handleRoleChange}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>
                                <div className="form-input">
                                    <button>Submit</button>
                                </div>
                                {errors && (
                                    <div className="alert">
                                        {Object.keys(errors).map((key) => (
                                            <p key={key}>{errors[key][0]}</p>
                                        ))}
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="pages-col-7"></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SignUp;
