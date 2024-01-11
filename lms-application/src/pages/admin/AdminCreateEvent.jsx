import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import CalendarEventForm from "../../components/dashboard/calendar/CalendarEventForm";

function AdminCreateEvent() {
    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <Link className="dashboard-link-left" to="/admin/calendar">
                    <ArrowBackIosIcon />
                    <h3 className="dashboard-title">Calendar</h3>
                </Link>
                <h3 className="dashboard-title">Create Event</h3>
            </div>
            <div>
                <CalendarEventForm />
            </div>
        </div>
    );
}

export default AdminCreateEvent;
