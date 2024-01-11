import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditProfile from "../../components/dashboard/profile/EditProfile";

function AdminEditProfile() {
    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <Link className="dashboard-link-left" to="/admin/profile">
                    <ArrowBackIosIcon />
                    <h3 className="dashboard-title">Profile</h3>
                </Link>
                <h3 className="dashboard-title">Edit Profile</h3>
            </div>
            <div>
                <EditProfile />
            </div>
        </div>
    );
}

export default AdminEditProfile;
