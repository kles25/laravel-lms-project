import React, { useState } from "react";
import { useStateContext } from "../../context/ContexProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

function Enrollment() {
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const navigate = useNavigate();
    const [enrollee, setEnrollee] = useState({
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
    });

    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/enrollees", enrollee)
            .then(() => {
                setNotification("Enrollment was successfull");
                navigate("/");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <>
            <div className="form-container">
                <div className="pages-row">
                    <div className="pages-col-5">
                        <form className="form-holder" onSubmit={onSubmit}>
                            <div className="form-input">
                                <label>Full Name</label>
                                <input
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
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
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
                                            date_of_birth: ev.target.value,
                                        })
                                    }
                                    type="date"
                                />
                            </div>
                            <div className="form-input">
                                <label>Gender</label>
                                <select
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
                                            gender: ev.target.value,
                                        })
                                    }
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="form-input">
                                <label>Address</label>
                                <input
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
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
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
                                            phone_number: ev.target.value,
                                        })
                                    }
                                    type="number"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className="form-input">
                                <label>Email</label>
                                <input
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
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
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
                                            nationality: ev.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Nationality"
                                />
                            </div>
                            <div className="form-input">
                                <label>Name of Guardian</label>
                                <input
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
                                            guardian_name: ev.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Name of Guardian"
                                />
                            </div>
                            <div className="form-input">
                                <label>Relationship with Guardian</label>
                                <input
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
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
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
                                            guardian_phone: ev.target.value,
                                        })
                                    }
                                    type="number"
                                    placeholder="Guardian Phone"
                                />
                            </div>
                            <div className="form-input">
                                <label>Previous School</label>
                                <input
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
                                            previous_school: ev.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="Previous School"
                                />
                            </div>
                            <div className="form-input">
                                <label>Former Grade</label>
                                <input
                                    onChange={(ev) =>
                                        setEnrollee({
                                            ...enrollee,
                                            grade_completed: ev.target.value,
                                        })
                                    }
                                    type="number"
                                    placeholder="Former Grade"
                                />
                            </div>
                            <div className="form-input">
                                <button>Submit</button>
                            </div>
                            {errors && (
                                <div className="alert">
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{errors[key][0]}</p>
                                    ))}
                                </div>
                            )}
                        </form>
                    </div>
                    <div className="pages-col-7"></div>
                </div>
            </div>
        </>
    );
}

export default Enrollment;
