import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axiosClient from "../../../../axios-client";
import "./batch.css";

const BatchList = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [batchStudents, setBatchStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadings, setLoadings] = useState(false);
    const [activeBatch, setActiveBatch] = useState(null);

    // Function to fetch batches from your backend using Axios
    const fetchBatches = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/batches"); // Replace '/api/batches' with your backend route
            setBatches(response.data.data); // Assuming the response contains an array of batches
            setLoading(false);
        } catch (error) {
            console.error("Error fetching batches:", error);
        }
    };

    useEffect(() => {
        // Fetch batches when the component mounts
        fetchBatches();
    }, []);

    const handleBatchClick = async (batch) => {
        setSelectedBatch(batch);
        setActiveBatch(batch.id);
        setLoadings(true);
        console.log(JSON.stringify(batch, null, 2));

        try {
            const courseResponse = await axiosClient.get(
                `/courses/${batch.course_id}`
            );
            const courseName = courseResponse.data.data.courseName;
            console.log(courseName);
            // Fetch the teacher associated with the batch
            const teacherResponse = await axiosClient.get(
                `/users/${batch.teacher_user_id}`
            );
            const teacherName = teacherResponse.data.user_name;
            console.log(teacherName);
            // Fetch students' details associated with the selected batch

            const studentsResponse = await axiosClient.get(
                `/batches/${batch.id}`
            );
            const students = studentsResponse.data.students;
            console.log("Batch students:", students);

            setBatchStudents(students);

            setSelectedBatch({
                ...batch,
                courseName: courseName,
                teacher: teacherName,
            });
            setLoadings(false);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    const closeModal = () => {
        setSelectedBatch(null);
        setBatchStudents([]);
        setActiveBatch(null);
    };

    return (
        <div className="test-list-container">
            <div className="pages-row">
                {loading && <div className="loader-two"></div>}
                {!loading && (
                    <div className="pages-col-6 left">
                        <div className="test-list-holder">
                            {batches.map((batch) => (
                                <nav
                                    key={batch.id}
                                    onClick={() => handleBatchClick(batch)}
                                    className={
                                        activeBatch === batch.id ? "active" : ""
                                    } // Add 'active' class if batch is active
                                >
                                    <p className="title">{batch.batch_name}</p>
                                </nav>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pages-col-6 right">
                    {selectedBatch && (
                        <div className="selected-test-details">
                            <div className="selected-test-holder">
                                <div className="db-header-holder">
                                    <h3 className="db-sub-title">
                                        Batch Details
                                    </h3>
                                    <CloseIcon onClick={closeModal} />
                                </div>
                                {loadings && <div className="loader-two"></div>}
                                {!loadings && (
                                    <>
                                        <h5 className="db-sub-title">
                                            Batch: {selectedBatch.batch_name}
                                        </h5>
                                        <h5 className="db-sub-title">
                                            Course: {selectedBatch.courseName}
                                        </h5>
                                        <h5 className="db-sub-title">
                                            Teacher: {selectedBatch.teacher}
                                        </h5>

                                        <h5 className="db-sub-title">
                                            List of Students:
                                        </h5>
                                        <div className="sl-holder">
                                            {batchStudents.map((student) => (
                                                <nav key={student.id}>
                                                    {student.user_name}{" "}
                                                    {/* Assuming 'displayName' is the field */}
                                                    {/* Display other student details */}
                                                </nav>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BatchList;
