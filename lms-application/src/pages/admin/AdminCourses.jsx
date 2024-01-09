import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import ListCourse from "../../components/dashboard/admin/courses/ListCourse";

function AdminCourses() {
    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <h3 className="dashboard-title">Courses</h3>
                <Link
                    className="dashboard-link-right"
                    to="/admin/create-course"
                >
                    <h3 className="dashboard-title">Create Course</h3>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
            <ListCourse />
        </div>
    );
}

export default AdminCourses;
