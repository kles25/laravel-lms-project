import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import StudentDashboardNavigation from "../../components/navigations/StudentDashboardNavigation";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HouseIcon from "@mui/icons-material/House";

function StudentDashboard() {
    const { user, setUser, setToken } = useStateContext();
    const [click, setClick] = useState(false);
    const [burgClick, setBurgClick] = useState(false);
    const modalRef = useRef(null);
    const imageRef = useRef(null);

    const handleBurgClick = () => setBurgClick(!burgClick);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !imageRef.current.contains(event.target) &&
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

    const handleClick = () => {
        setClick((prevState) => !prevState);
    };

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/signout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    const baseURL = "http://localhost:8000/";
    const imageUrl = baseURL + user.image;

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-holder">
                    <div className="pages-row">
                        <div
                            className={
                                burgClick ? "pages-col-2 active" : "pages-col-2"
                            }
                        >
                            <div className="dashboard-navigation-holder">
                                <StudentDashboardNavigation />
                            </div>
                        </div>
                        <div
                            className={
                                burgClick
                                    ? "pages-col-10 active"
                                    : "pages-col-10"
                            }
                        >
                            <div className="pages-row">
                                <div className="pages-col-12">
                                    <div className="dashboard-header-holder">
                                        <div className="pages-row">
                                            <div className="pages-col-10">
                                                <div
                                                    className="dashboard-role-header"
                                                    style={{
                                                        padding: "1vh",
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            burgClick
                                                                ? "db-hb-icon-holder active"
                                                                : "db-hb-icon-holder"
                                                        }
                                                        onClick={
                                                            handleBurgClick
                                                        }
                                                    >
                                                        <div className="db-hb-icon-one"></div>
                                                        <div className="db-hb-icon-two"></div>
                                                        <div className="db-hb-icon-three"></div>
                                                    </div>

                                                    <h3 className="dashboard-title">
                                                        {user.role}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="pages-col-2">
                                                <div className="dashboard-header-components">
                                                    <nav>
                                                        <NotificationsNoneIcon />
                                                    </nav>
                                                    <nav>
                                                        <SettingsIcon />
                                                    </nav>

                                                    <img
                                                        ref={imageRef}
                                                        src={imageUrl}
                                                        alt="avatar"
                                                        onClick={handleClick}
                                                    />
                                                    <div
                                                        ref={modalRef}
                                                        className={
                                                            click
                                                                ? "header-components-modal active"
                                                                : "header-components-modal"
                                                        }
                                                    >
                                                        <Link
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                            className={
                                                                click
                                                                    ? "components-modal-links active"
                                                                    : "components-modal-links"
                                                            }
                                                        >
                                                            <AccountBoxIcon />
                                                            <p>{user.name}</p>
                                                        </Link>
                                                        <Link
                                                            to="/"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                            className={
                                                                click
                                                                    ? "components-modal-links active"
                                                                    : "components-modal-links"
                                                            }
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <HouseIcon />
                                                            <p>Homepage</p>
                                                        </Link>
                                                        <Link
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                            className={
                                                                click
                                                                    ? "components-modal-links active"
                                                                    : "components-modal-links"
                                                            }
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Stop event propagation
                                                                onLogout(e); // Trigger the logout function
                                                            }}
                                                        >
                                                            <LogoutIcon />
                                                            <p>SignOut</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pages-col-12">
                                    <div className="dashboard-section-holder">
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentDashboard;
