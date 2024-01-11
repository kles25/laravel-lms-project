import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axiosClient from "../../../axios-client";
import "./calendar.css";

const localizer = momentLocalizer(moment);

const CalendarEventList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const getEvents = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/events");
            setLoading(false);
            const formattedEvents = response.data.data.map((event) => ({
                ...event,
                start: new Date(event.start_date), // Assuming 'start_date' is the field from API
                end: new Date(event.end_date), // Assuming 'end_date' is the field from API
            }));
            setEvents(formattedEvents);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event); // Set the selected event details when an event is clicked
    };

    const handleCloseEventDetails = () => {
        setSelectedEvent(null); // Close the event details section/modal
    };

    return (
        <>
            {loading && <div className="loader-two"></div>}

            {!loading && (
                <div className="event-calendar-holder">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectEvent={handleSelectEvent}
                        selectable
                        resizable
                        style={{
                            padding: "2vh",
                            backgroundColor: "#071c30e6",
                            fontSize: "1.7vh!important",
                        }}
                    />

                    {selectedEvent && (
                        <div
                            className="event-details"
                            style={{ marginTop: "2vh" }}
                        >
                            <h3 className="db-title">Event Details</h3>
                            <p>Title: {selectedEvent.title}</p>
                            <p>Start: {selectedEvent.start.toString()}</p>
                            <p>End: {selectedEvent.end.toString()}</p>
                            <p>Description: {selectedEvent.description}</p>
                            <button
                                className="form-button"
                                onClick={handleCloseEventDetails}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default CalendarEventList;
