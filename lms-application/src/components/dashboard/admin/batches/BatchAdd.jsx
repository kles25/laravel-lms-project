import React, { useState, useEffect } from "react";
import axiosClient from "../../../../axios-client";
import { useNavigate } from "react-router-dom";

const BatchAdd = () => {
    const [batchName, setBatchName] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedStudents, setSelectedStudents] = useState("");
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [displaySelectedStudents, setDisplaySelectedStudents] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchCourses = async () => {
        try {
            // Make an Axios GET request to fetch courses from your API
            const response = await axiosClient.get("/courses");

            // Assuming your API response contains an array of courses
            const coursesList = response.data.data.map((course) => ({
                id: course.id,
                ...course, // Include other course data as needed
            }));

            setCourses(coursesList);
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await axiosClient.get("/users");
            const allUsers = response.data.data; // Assuming the response contains an array of all users

            // Filter out only the teachers from allUsers
            const teachersList = allUsers.filter(
                (user) => user.role === "teacher"
            );

            setTeachers(teachersList);
        } catch (error) {
            console.error("Error fetching teachers: ", error);
        }
    };

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/users");
            const allUsers = response.data.data; // Assuming the response contains an array of all users

            // Filter out only the students from allUsers
            const studentsList = allUsers.filter(
                (user) => user.role === "student"
            );

            setStudents(studentsList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching students: ", error);
        }
    };

    useEffect(() => {
        // Fetch courses, teachers, and students when the component mounts
        fetchCourses();
        fetchTeachers();
        fetchStudents();
    }, []); // Empty dependency array ensures these functions run only once

    useEffect(() => {
        // Update the display of selected students whenever 'selectedStudents' changes
        setDisplaySelectedStudents(
            students.filter((student) => selectedStudents.includes(student.id))
        );
    }, [selectedStudents, students]);

    const handleCreateBatch = async (e) => {
        e.preventDefault();
        try {
            const batchData = {
                batch_name: batchName,
                course_id: selectedCourse,
                teacher_user_id: selectedTeacher,
                students: selectedStudents,
            };

            const createdBatch = await axiosClient.post("/batches", batchData);

            console.log("Batch created with ID: ", createdBatch.data.batch.id);

            // Assuming that the API automatically associates the batch with the students based on the selectedStudents array

            // Reset the form fields after successful creation
            setBatchName("");
            setSelectedCourse("");
            setSelectedTeacher("");
            setSelectedStudents("");
            navigate("/admin/batch");
        } catch (error) {
            console.error("Error creating batch: ", error);
        }
    };

    return (
        <div className="create-batch-container">
            <div className="pages-row">
                <div className="pages-col-4">
                    <div className="form-input">
                        <input
                            type="text"
                            placeholder="Enter batch name"
                            value={batchName}
                            onChange={(e) => setBatchName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="pages-col-4">
                    <div className="form-input">
                        {/* Dropdown for selecting courses */}
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="pages-col-4">
                    <div className="form-input">
                        {/* Dropdown for selecting teachers */}
                        <select
                            value={selectedTeacher}
                            onChange={(e) => setSelectedTeacher(e.target.value)}
                        >
                            <option value="">Select a teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.user_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="batch-selection-holder">
                <div className="pages-row">
                    <div className="pages-col-6">
                        <div className="ssh-class">
                            <h5 className="db-sub-title">Select Students:</h5>
                            {loading && <div className="loader-two"></div>}
                            {!loading && (
                                <ul>
                                    {students.map((student) => (
                                        <li key={student.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={student.id}
                                                    onChange={(e) => {
                                                        const selectedId =
                                                            e.target.value;
                                                        const isChecked =
                                                            e.target.checked;

                                                        if (isChecked) {
                                                            setSelectedStudents(
                                                                [
                                                                    ...selectedStudents,
                                                                    selectedId,
                                                                ]
                                                            );
                                                        } else {
                                                            const filteredStudents =
                                                                selectedStudents.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        selectedId
                                                                );
                                                            setSelectedStudents(
                                                                filteredStudents
                                                            );
                                                        }
                                                    }}
                                                />
                                                {student.user_name}{" "}
                                                {/* Assuming 'displayName' is the field */}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="pages-col-6">
                        <div className="ssh-class">
                            <h5 className="db-sub-title">Selected Students:</h5>
                            <ul>
                                {displaySelectedStudents.map((student) => (
                                    <li key={student.id}>
                                        {student.user_name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleCreateBatch}>Create Batch</button>
        </div>
    );
};

export default BatchAdd;
