import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axiosClient from "../../../../axios-client";

const DetailsCourse = () => {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCourseDetails = async () => {
        try {
            const response = await axiosClient.get(`/courses/${id}`);
            const courseData = response.data.data;
            courseData.units = JSON.parse(courseData.units); // Parse the string to array
            setCourseDetails(courseData);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCourseDetails();
    }, []);

    const Modal = ({ topic, onClose }) => {
        return (
            <div className="course-modal-container">
                <div className="modal-content">
                    <div className="dashboard-title-holder">
                        <h3 className="dashboard-title">{topic}</h3>
                        <CloseIcon onClick={onClose} />
                    </div>
                    <p>Modal content related to the topic...</p>
                </div>
            </div>
        );
    };

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUnitClick = (unit) => {
        setSelectedUnit(unit);
    };

    if (!courseDetails) {
        return (
            <div className="default-page-container">
                <div className="loader"></div>
                <div className="">
                    <h3 className="loading-text">
                        Redirecting
                        <span data-text=".">.</span>
                        <span data-text=".">.</span>
                        <span data-text=".">.</span>
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="course-details-container">
            <div className="pages-row course-details-holder">
                <div className="pages-col-12">
                    <div className="course-details-header">
                        <h3 className="dashboard-title">
                            {courseDetails.courseName}
                        </h3>
                        <Link
                            className="dashboard-link-right"
                            to="/admin/courses"
                        >
                            <h3 className="dashboard-title">Dashboard</h3>
                            <ArrowForwardIosIcon />
                        </Link>
                    </div>
                </div>
                <div className="pages-col-12">
                    <div className="pages-row course-details-body">
                        <div className="pages-col-4">
                            <div className="course-navigation">
                                {courseDetails.units.map((unit, index) => (
                                    <div key={index}>
                                        <nav
                                            className={`db-navigation-links ${
                                                selectedUnit === unit
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >
                                            <Link
                                                to=""
                                                onClick={() =>
                                                    handleUnitClick(unit)
                                                }
                                            >
                                                UNIT 1:
                                                <span
                                                    style={{
                                                        marginLeft: "5px",
                                                    }}
                                                >
                                                    {unit.unitTitle}
                                                </span>
                                            </Link>
                                        </nav>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pages-col-8">
                            <div className="course-unit-details">
                                {selectedUnit ? (
                                    <div>
                                        <h3 className="dashboard-title">
                                            {selectedUnit.unitTitle}
                                        </h3>
                                        <p>{selectedUnit.unitDetails}</p>
                                    </div>
                                ) : (
                                    <p>Select a unit to view details.</p>
                                )}
                            </div>
                            <div className="course-topics">
                                {selectedUnit && (
                                    <div className="pages-row">
                                        {selectedUnit.topics.map(
                                            (topic, index) => (
                                                <nav
                                                    className="pages-col-6 db-links"
                                                    key={index}
                                                    onClick={() =>
                                                        handleTopicClick(topic)
                                                    }
                                                >
                                                    <ArrowOutwardIcon />
                                                    <h5>{topic}</h5>
                                                </nav>
                                            )
                                        )}
                                    </div>
                                )}
                                {!selectedUnit && (
                                    <p>Select a unit to view topics.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal topic={selectedTopic} onClose={closeModal} />
            )}
        </div>
    );
};

export default DetailsCourse;
