import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCourse from "../../components/dashboard/admin/courses/AddCourse";

function AdminCreateCourse() {
    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <Link className="dashboard-link-left" to="/admin/courses">
                    <ArrowBackIosIcon />
                    <h3 className="dashboard-title">Courses</h3>
                </Link>
                <h3 className="dashboard-title">Create Course</h3>
            </div>
            <div>
                <AddCourse />
            </div>
        </div>
    );
}

export default AdminCreateCourse;
