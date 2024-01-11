import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarEventList from "../../components/dashboard/calendar/CalendarEventList";

function AdminCalendar() {
    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <h3 className="dashboard-title">Calendar</h3>
                <Link className="dashboard-link-right" to="/admin/create-event">
                    <h3 className="dashboard-title">Create Events</h3>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
            <CalendarEventList />
        </div>
    );
}

export default AdminCalendar;
