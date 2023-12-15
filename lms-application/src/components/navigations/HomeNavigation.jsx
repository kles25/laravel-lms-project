import React, { useEffect, useRef, useState } from "react";
import "./navigations.css";
import { Link, useNavigate } from "react-router-dom";
import CubeLogo from "../animation/CubeLogo";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/news", label: "News" },
    { path: "/contact", label: "Contact" },
    { path: "/courses", label: "Courses" },
];

function HomeNavigation() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const { user, token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !iconRef.current.contains(event.target) &&
                click
            ) {
                setClick(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [click]);

    const onLogout = () => {
        axiosClient.post("/signout").then(() => {
            setUser({});
            setToken(null);
            navigate("/signin");
        });
    };

    const goToDashboard = () => {
        if (user.role === "admin") {
            navigate("/admin");
        } else if (user.role === "teacher") {
            navigate("/teacher");
        } else if (user.role === "student") {
            navigate("/student");
        } else {
            navigate("/signin");
        }
        console.log(user.role);
    };

    return (
        <div className="header-holder">
            <div className="header-logo-holder">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h3 className="header-home-title">H-CAMP</h3>
                </Link>
                <Link
                    className="hidden-logo"
                    to="/"
                    style={{ textDecoration: "none" }}
                >
                    <CubeLogo />
                </Link>
            </div>
            <div className="header-navigation-holder">
                <h3 className="header-home-title">MENU</h3>
                <div
                    ref={iconRef}
                    className={
                        click ? "hb-icon-holder active" : "hb-icon-holder"
                    }
                    onClick={handleClick}
                >
                    <div className="hb-icon-one"></div>
                    <div className="hb-icon-two"></div>
                    <div className="hb-icon-three"></div>
                </div>
            </div>
            <div
                ref={modalRef}
                className={
                    click
                        ? "header-navigation-links active"
                        : "header-navigation-links"
                }
            >
                {navLinks.map(({ path, label }, index) => (
                    <Link to={path} key={index} className="navigations-link">
                        {label}
                    </Link>
                ))}
                {!token && ( // Conditionally render if no user is logged in
                    <>
                        <Link to="/signin" className="navigations-link">
                            Sign In
                        </Link>
                        <Link to="/signup" className="navigations-link">
                            Sign Up
                        </Link>
                    </>
                )}
                {token && ( // Conditionally render if user is logged in
                    <>
                        <Link className="navigations-link" onClick={onLogout}>
                            Sign Out
                        </Link>
                        <Link
                            className="navigations-link"
                            onClick={goToDashboard}
                        >
                            Dashboard
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default HomeNavigation;
