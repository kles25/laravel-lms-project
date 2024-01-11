import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import ViewProfile from "../../components/dashboard/profile/ViewProfile";

function AdminProfile() {
    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <h3 className="dashboard-title">Profile</h3>
                <Link className="dashboard-link-right" to="/admin/edit-profile">
                    <h3 className="dashboard-title">Edit Profile</h3>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
            <ViewProfile />
        </div>
    );
}

export default AdminProfile;
