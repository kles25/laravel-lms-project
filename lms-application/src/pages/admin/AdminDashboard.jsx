import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminDashboardNavigation from "../../components/navigations/AdminDashboardNavigation";

function AdminDashboard() {
    const { user, token, setUser, setToken } = useStateContext();
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    if (!token) {
        return <Navigate to="/signin" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/signout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    const baseURL = "http://localhost:8000/";
    const imageUrl = baseURL + user.image;

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-holder">
                    <div className="pages-row">
                        <div className="pages-col-2">
                            <div className="dashboard-navigation-holder">
                                <AdminDashboardNavigation />
                            </div>
                        </div>
                        <div className="pages-col-10">
                            <div className="pages-row">
                                <div className="pages-col-12">
                                    <div className="dashboard-header-holder">
                                        <div className="pages-row">
                                            <div className="pages-col-10"></div>
                                            <div className="pages-col-2">
                                                <div className="dashboard-header-components">
                                                    <nav>
                                                        <NotificationsNoneIcon />
                                                    </nav>
                                                    <nav>
                                                        <SettingsIcon />
                                                    </nav>

                                                    <img
                                                        src={imageUrl}
                                                        alt="avatar"
                                                        onClick={handleClick}
                                                    />
                                                    <div
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
                                                            onClick={onLogout}
                                                        >
                                                            <LogoutIcon />
                                                            <p>SignOut</p>
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
                                                        >
                                                            <LogoutIcon />
                                                            <p>{user.name}</p>
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

export default AdminDashboard;
