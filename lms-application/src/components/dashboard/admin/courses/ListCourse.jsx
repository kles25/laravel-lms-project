import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../../axios-client";

const ListCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCourses = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/courses");
            setLoading(false);
            setCourses(response.data.data);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const CourseDetailsLink = ({ id, courseName }) => (
        <div className="course-card">
            <div className="course-card-header">
                <h4>{courseName}</h4>
                <div className="course-card-button">
                    <Link
                        className="view-details-button"
                        to={`/course-details/${id}`}
                        style={{ textDecoration: "none" }}
                        key={id}
                    >
                        View Details
                    </Link>
                    <Link
                        className="edit-course-button"
                        to={`/create-course/${id}`} // Update this route to match your edit route
                        style={{ textDecoration: "none" }}
                        key={id}
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="course-list-container">
            <div className="pages-row courses-holder">
                {loading && <div className="loader-two"></div>}
                {!loading &&
                    courses.map((course) => (
                        <div className="pages-col-3" key={course.id}>
                            <div className="course-holder">
                                <CourseDetailsLink
                                    id={course.id}
                                    courseName={course.courseName}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListCourse;
