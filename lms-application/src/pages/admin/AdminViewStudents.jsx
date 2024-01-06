import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function AdminViewStudents() {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const navigate = useNavigate();
    let { id } = useParams();
    const [students, setStudents] = useState({
        id: null,
        full_name: "",
        date_of_birth: "",
        gender: "",
        address: "",
        phone_number: "",
        email: "",
        nationality: "",
        guardian_name: "",
        guardian_relationship: "",
        guardian_phone: "",
        previous_school: "",
        grade_completed: "",
        date_enrolled: "",
        created_at: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/students/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setStudents(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, [id]);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(students);

        if (students.id) {
            axiosClient
                .put(`/students/${students.id}`, students)
                .then(() => {
                    setNotification("User was successfully updated");
                    navigate("/admin/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/students", students)
                .then(() => {
                    setNotification("User was successfully created");
                    navigate("/admin/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            <div className="dashboard-section-content">
                {students.id && (
                    <div className="dashboard-title-holder">
                        <Link className="dashboard-link-left" to="/admin/users">
                            <ArrowBackIosIcon />
                            <h3 className="dashboard-title">Users</h3>
                        </Link>
                        <h3 className="dashboard-title">
                            Edit Enrollee: {students.full_name}
                        </h3>
                    </div>
                )}
                <div className="form-container">
                    <div className="pages-row">
                        {loading && (
                            <div className="text-center">Loading...</div>
                        )}
                        {!loading && (
                            <form className="form-holder" onSubmit={onSubmit}>
                                <div className="pages-row">
                                    <div className="pages-col-12">
                                        <h3>Personal Information</h3>
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Full Name</label>
                                        <input
                                            value={students.full_name}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    full_name: ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Date of Birth</label>
                                        <input
                                            value={students.date_of_birth}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    date_of_birth:
                                                        ev.target.value,
                                                })
                                            }
                                            type="date"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Gender</label>
                                        <select
                                            value={students.gender}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    gender: ev.target.value,
                                                })
                                            }
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">
                                                Female
                                            </option>
                                        </select>
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Address</label>
                                        <input
                                            value={students.address}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    address: ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Address"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Phone Number</label>
                                        <input
                                            value={students.phone_number}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    phone_number:
                                                        ev.target.value,
                                                })
                                            }
                                            type="number"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Email</label>
                                        <input
                                            value={students.email}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    email: ev.target.value,
                                                })
                                            }
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Nationality</label>
                                        <input
                                            value={students.nationality}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    nationality:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Nationality"
                                        />
                                    </div>
                                </div>
                                <div className="pages-row">
                                    <div className="pages-col-12">
                                        <h3>Guardian Information</h3>
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Name of Guardian</label>
                                        <input
                                            value={students.guardian_name}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    guardian_name:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Name of Guardian"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>
                                            Relationship with Guardian
                                        </label>
                                        <input
                                            value={
                                                students.guardian_relationship
                                            }
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    guardian_relationship:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Relationship with Guardian"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Guardian Phone</label>
                                        <input
                                            value={students.guardian_phone}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    guardian_phone:
                                                        ev.target.value,
                                                })
                                            }
                                            type="number"
                                            placeholder="Guardian Phone"
                                        />
                                    </div>
                                </div>
                                <div className="pages-row">
                                    <div className="pages-col-12">
                                        <h3>Previous Records</h3>
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Previous School</label>
                                        <input
                                            value={students.previous_school}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    previous_school:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Previous School"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Former Grade</label>
                                        <input
                                            value={students.grade_completed}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    grade_completed:
                                                        ev.target.value,
                                                })
                                            }
                                            type="number"
                                            placeholder="Former Grade"
                                        />
                                    </div>
                                </div>
                                <div className="pages-row">
                                    <div className="pages-col-12">
                                        <h3>Other Information</h3>
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Date Enrolled</label>
                                        <input
                                            readOnly
                                            value={students.date_enrolled}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    date_enrolled:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-input pages-col-4">
                                        <label>Date Accepted</label>
                                        <input
                                            readOnly
                                            value={students.created_at}
                                            onChange={(ev) =>
                                                setStudents({
                                                    ...students,
                                                    created_at: ev.target.value,
                                                })
                                            }
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="pages-row">
                                    <div className="pages-col-12">
                                        <h3>Actions</h3>
                                        <div className="form-input pages-col-4">
                                            <button>Save</button>
                                        </div>
                                    </div>
                                </div>
                                {errors && (
                                    <div className="alert">
                                        {Object.keys(errors).map((key) => (
                                            <p key={key}>{errors[key][0]}</p>
                                        ))}
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                    <div className="pages-col-7"></div>
                </div>
            </div>
        </>
    );
}

export default AdminViewStudents;
