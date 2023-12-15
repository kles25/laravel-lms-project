import React, { createRef, useEffect, useState } from "react";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { token, setUser, setToken, updateUser } = useStateContext();
    const [message, setMessage] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();

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

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/signin", payload)
            .then(({ data }) => {
                setUser(data.user);
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
                    setMessage(response.data.message);
                }
            });
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
                        <div className="pages-col-7"></div>
                        <div className="pages-col-5">
                            <form className="form-holder" onSubmit={onSubmit}>
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
                                    <button>Submit</button>
                                </div>
                                {message && (
                                    <div className="alert">
                                        <p>{message}</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SignIn;
