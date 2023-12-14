import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function AdminCreateUsers() {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const navigate = useNavigate();
    let { user_code } = useParams();
    const [user, setUser] = useState({
        user_code: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        image: null,
        image_url: null,
    });

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setUser({
                ...user,
                image: file,
                image_url: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    if (user_code) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${user_code}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(user);

        const payload = { ...user };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

        if (user.user_code) {
            axiosClient
                .put(`/users/${user.user_code}`, payload)
                .then(() => {
                    setNotification("User was successfully updated");
                    navigate("/admin/users");
                    console.log(user);
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
                .post("/users", payload)
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
        <div className="dashboard-section-content">
            {!user.user_code && (
                <div className="dashboard-title-holder">
                    <Link className="dashboard-link-left" to="/admin/users">
                        <ArrowBackIosIcon />
                        <h3 className="dashboard-title">Users</h3>
                    </Link>
                    <h3 className="dashboard-title">Create Users</h3>
                </div>
            )}

            <div className="dashboard-createuser-form">
                {user.user_code && (
                    <div className="dashboard-title-holder">
                        <Link className="dashboard-link-left" to="/admin/users">
                            <ArrowBackIosIcon />
                            <h3 className="dashboard-title">Users</h3>
                        </Link>
                        <h3 className="dashboard-title">
                            Edit User: {user.name}
                        </h3>
                    </div>
                )}
                {loading && <div className="text-center">Loading...</div>}

                {!loading && (
                    <form onSubmit={onSubmit} className="form-holder">
                        <div className="form-input">
                            <label>Full Name</label>
                            <input
                                value={user.name}
                                onChange={(ev) =>
                                    setUser({ ...user, name: ev.target.value })
                                }
                                type="text"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="form-input">
                            <label>Email</label>
                            <input
                                value={user.email}
                                onChange={(ev) =>
                                    setUser({ ...user, email: ev.target.value })
                                }
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-input">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        password: ev.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-input">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        password_confirmation: ev.target.value,
                                    })
                                }
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="form-input">
                            <label>Role</label>
                            <select
                                value={user.role} // Assuming user.role represents the role state
                                onChange={(ev) =>
                                    setUser({ ...user, role: ev.target.value })
                                }
                            >
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <div className="form-input">
                            <div
                                className="img-upload-holder"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <label>Profile Image</label>
                                {user.image_url && (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={user.image_url}
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
                                {!user.image_url && (
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
                                    onChange={onImageChoose}
                                    style={{ display: "none" }}
                                />
                            </div>
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
                )}
            </div>
        </div>
    );
}

export default AdminCreateUsers;
