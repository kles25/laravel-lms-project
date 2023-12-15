import React, { useState } from "react";
import { Link } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import SchoolIcon from "@mui/icons-material/School";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import CubeLogo from "../animation/CubeLogo";

const navLinks = [
    { path: "/admin/home", label: "Home", icon: <HouseIcon /> },
    { path: "/admin/courses", label: "Courses", icon: <SchoolIcon /> },
    { path: "/admin/users", label: "Users", icon: <AccountBoxIcon /> },
    { path: "/admin/batch", label: "Batch", icon: <GroupIcon /> },
    { path: "/admin/calendar", label: "Calendar", icon: <CalendarMonthIcon /> },
    { path: "/admin/profile", label: "Profile", icon: <AccountCircleIcon /> },
];

function AdminDashboardNavigation() {
    const [activeLink, setActiveLink] = useState("/admin"); // Set the default active link
    const handleNavClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className="dashboard-navigation-content">
            <div className="pages-row">
                <div className="pages-col-12">
                    <div className="dashboard-navigation-title">
                        <Link
                            className="text"
                            to=""
                            style={{ textDecoration: "none" }}
                        >
                            <h1>H-CAMP</h1>
                        </Link>
                        <Link
                            className="logo"
                            to=""
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <CubeLogo />
                        </Link>
                    </div>
                    <div className="dashboard-navigation-links">
                        {navLinks.map(({ path, label, icon }, index) => (
                            <nav
                                key={index}
                                className={`navigation-links ${
                                    activeLink === path ? "active" : ""
                                }`}
                                onClick={() => handleNavClick(path)}
                            >
                                <Link to={path}>
                                    {icon}
                                    <p>{label}</p>
                                </Link>
                            </nav>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardNavigation;
