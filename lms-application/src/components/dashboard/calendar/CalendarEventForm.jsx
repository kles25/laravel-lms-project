import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const CalendarEventForm = () => {
    const [event, setEvent] = useState({
        title: "",
        start_date: new Date(),
        start_time: "09:00", // Default start time
        end_date: new Date(),
        end_time: "10:00",
        description: "",
        image: null,
        image_url: null,
    });

    const navigate = useNavigate();

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setEvent({
                ...event,
                image: file,
                image_url: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleStartDateChange = (date) => {
        setEvent({ ...event, start_date: date });
    };

    const handleStartTimeChange = (time) => {
        setEvent({ ...event, start_time: time });
    };

    const handleEndDateChange = (date) => {
        setEvent({ ...event, end_date: date });
    };

    const handleEndTimeChange = (time) => {
        setEvent({ ...event, end_time: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...event };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

        if (!payload.title || !payload.start_date || !payload.end_date) {
            alert("Title, Start Date, and End Date are required!");
            return;
        }

        try {
            // Make POST request to your API endpoint to create event
            const response = await axiosClient.post("/events", {
                title: payload.title,
                start_date: payload.start_date,
                start_time: payload.start_time,
                end_date: payload.end_date,
                end_time: payload.end_time,
                description: payload.description,
                image: payload.image,
            });

            // Process response or handle success as needed
            console.log("Event created:", response.data);

            // Clear the form after adding the event
            setEvent({
                title: "",
                start_date: new Date(),
                start_time: "09:00",
                end_date: new Date(),
                end_time: "10:00",
                description: "",
                image: "",
            });

            navigate("/admin/calendar");
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <div className="event-holder">
            <form className="pages-row" onSubmit={handleSubmit}>
                <div className="pages-col-6 form-input">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={event.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-input">
                    <div
                        className="img-upload-holder"
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <label>Event Image</label>
                        {event.image_url && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={event.image_url}
                                    alt="avatar"
                                    style={{
                                        height: "10vh",
                                        width: "auto",
                                        marginLeft: "2vh",
                                    }}
                                />
                                <label
                                    htmlFor="file"
                                    style={{
                                        marginTop: "0",
                                        marginLeft: "2vh",
                                        cursor: "pointer",
                                        border: "1px solid #fffffe",
                                        padding: "1vh .5vh",
                                        borderRadius: "1vh",
                                    }}
                                >
                                    Change
                                </label>
                            </div>
                        )}
                        {!event.image_url && (
                            <label htmlFor="file">
                                <AddPhotoAlternateIcon
                                    style={{
                                        color: "#fffffe",
                                        fontSize: "5vh",
                                        marginLeft: "2vh",
                                        cursor: "pointer",
                                    }}
                                />
                            </label>
                        )}
                        <input
                            type="file"
                            id="file"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <div className="pages-col-6 form-input">
                    <label>Start Date:</label>
                    <DatePicker
                        selected={event.start_date}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="pages-col-6 form-input">
                    <label>Start Time:</label>
                    <input
                        type="time"
                        name="start_time"
                        value={event.start_time}
                        onChange={(e) => handleStartTimeChange(e.target.value)}
                    />
                </div>
                <div className="pages-col-6 form-input">
                    <label>End Date:</label>
                    <DatePicker
                        selected={event.end_date}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div className="pages-col-6 form-input">
                    <label>End Time:</label>
                    <input
                        type="time"
                        name="end_time"
                        value={event.end_time}
                        onChange={(e) => handleEndTimeChange(e.target.value)}
                    />
                </div>
                <div className="pages-col-6 form-input">
                    <label>Description:</label>
                    <textarea
                        rows="6"
                        name="description"
                        value={event.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="pages-col-12 form-input">
                    <div className="pages-col-6 form-input">
                        <button className="form-button" type="submit">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CalendarEventForm;
