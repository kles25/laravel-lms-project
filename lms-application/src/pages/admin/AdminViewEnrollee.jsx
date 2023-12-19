import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function AdminViewEnrollee() {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const navigate = useNavigate();
    let { id } = useParams();
    const [enrolled, setEnrolled] = useState({
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
        enrolled_at: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/enrollees/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setEnrolled(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, [id]);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(enrolled);

        if (enrolled.id) {
            axiosClient
                .put(`/enrollees/${enrolled.id}`, enrolled)
                .then(() => {
                    setNotification("User was successfully updated");
                    navigate("/admin/users");
                    console.log(enrolled);
                    window.location.reload();
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/enrollees", enrolled)
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
                {enrolled.id && (
                    <div className="dashboard-title-holder">
                        <Link className="dashboard-link-left" to="/admin/users">
                            <ArrowBackIosIcon />
                            <h3 className="dashboard-title">Users</h3>
                        </Link>
                        <h3 className="dashboard-title">
                            Edit User: {enrolled.full_name}
                        </h3>
                    </div>
                )}
                <div className="form-container">
                    <div className="pages-row">
                        <div className="pages-col-5">
                            {loading && (
                                <div className="text-center">Loading...</div>
                            )}
                            {!loading && (
                                <form
                                    className="form-holder"
                                    onSubmit={onSubmit}
                                >
                                    <div className="form-input">
                                        <label>Full Name</label>
                                        <input
                                            value={enrolled.full_name}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    full_name: ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Date of Birth</label>
                                        <input
                                            value={enrolled.date_of_birth}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    date_of_birth:
                                                        ev.target.value,
                                                })
                                            }
                                            type="date"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Gender</label>
                                        <select
                                            value={enrolled.gender}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
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
                                    <div className="form-input">
                                        <label>Address</label>
                                        <input
                                            value={enrolled.address}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    address: ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Address"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Phone Number</label>
                                        <input
                                            value={enrolled.phone_number}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    phone_number:
                                                        ev.target.value,
                                                })
                                            }
                                            type="number"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Email</label>
                                        <input
                                            value={enrolled.email}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    email: ev.target.value,
                                                })
                                            }
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Nationality</label>
                                        <input
                                            value={enrolled.nationality}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    nationality:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Nationality"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Name of Guardian</label>
                                        <input
                                            value={enrolled.guardian_name}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    guardian_name:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Name of Guardian"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>
                                            Relationship with Guardian
                                        </label>
                                        <input
                                            value={
                                                enrolled.guardian_relationship
                                            }
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    guardian_relationship:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Relationship with Guardian"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Guardian Phone</label>
                                        <input
                                            value={enrolled.guardian_phone}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    guardian_phone:
                                                        ev.target.value,
                                                })
                                            }
                                            type="number"
                                            placeholder="Guardian Phone"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Previous School</label>
                                        <input
                                            value={enrolled.previous_school}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    previous_school:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Previous School"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Former Grade</label>
                                        <input
                                            value={enrolled.grade_completed}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    grade_completed:
                                                        ev.target.value,
                                                })
                                            }
                                            type="number"
                                            placeholder="Former Grade"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label>Date Enrolled</label>
                                        <input
                                            readOnly
                                            value={enrolled.enrolled_at}
                                            onChange={(ev) =>
                                                setEnrolled({
                                                    ...enrolled,
                                                    enrolled_at:
                                                        ev.target.value,
                                                })
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <button>Submit</button>
                                    </div>
                                    {errors && (
                                        <div className="alert">
                                            {Object.keys(errors).map((key) => (
                                                <p key={key}>
                                                    {errors[key][0]}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                        <div className="pages-col-7"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminViewEnrollee;
