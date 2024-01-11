import React, { useEffect, useState } from "react";
import "./profile.css";
import { useStateContext } from "../../../context/ContexProvider";
import axiosClient from "../../../axios-client";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const { user } = useStateContext();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        id: null,
        display_name: null,
        user_name: "",
        email: null,
        address: null,
        phone_number: null,
        image: null,
        image_url: null,
    });

    if (user.id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${user.id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setEditedProfile(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setEditedProfile({
                ...editedProfile,
                image: file,
                image_url: reader.result,
            });
            setIsChange(true);

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const payload = { ...user };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

        axiosClient
            .put(`/users/${user.id}`, payload)
            .then(() => {
                navigate("/admin/profile");
                window.location.reload();
                console.log(user);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    const handleInputChange = (field, value) => {
        setEditedProfile({
            ...editedProfile,
            [field]: value,
        });
        setIsChange(true); // Set isDirty to true when input changes
    };

    return (
        <div className="profile-container">
            <div className="profile-holder">
                <div className="pages-row">
                    <div className="pages-col-12">
                        <div
                            className="profile-overview"
                            style={{ marginTop: "0vh" }}
                        >
                            <div className="profile-details">
                                {loading && <div className="loader-two"></div>}
                                {!loading && (
                                    <form onSubmit={handleUpdateProfile}>
                                        <div className="pages-row">
                                            <div className="pages-col-6">
                                                <div className="details-style">
                                                    <label>USER NAME</label>
                                                    <input
                                                        value={
                                                            editedProfile.user_name
                                                        }
                                                        onChange={(ev) =>
                                                            handleInputChange(
                                                                "user_name",
                                                                ev.target.value
                                                            )
                                                        }
                                                    />
                                                    <label>NAME</label>
                                                    <input
                                                        value={
                                                            editedProfile.display_name
                                                        }
                                                        onChange={(ev) =>
                                                            handleInputChange(
                                                                "display_name",
                                                                ev.target.value
                                                            )
                                                        }
                                                    />
                                                    <label>EMAIL</label>
                                                    <input
                                                        value={
                                                            editedProfile.email
                                                        }
                                                        onChange={(ev) =>
                                                            handleInputChange(
                                                                "email",
                                                                ev.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="pages-col-6">
                                                <div className="details-style">
                                                    <label>ADDRESS</label>
                                                    <input
                                                        value={
                                                            editedProfile.address
                                                        }
                                                        onChange={(ev) =>
                                                            handleInputChange(
                                                                "address",
                                                                ev.target.value
                                                            )
                                                        }
                                                    />
                                                    <label>PHONE NUMBER</label>
                                                    <input
                                                        value={
                                                            editedProfile.phone_number
                                                        }
                                                        onChange={(ev) =>
                                                            handleInputChange(
                                                                "phone_number",
                                                                ev.target.value
                                                            )
                                                        }
                                                    />
                                                    <div className="form-input">
                                                        <div
                                                            className="img-upload-holder"
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <label>
                                                                Profile Image
                                                            </label>
                                                            {editedProfile.image_url && (
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            editedProfile.image_url
                                                                        }
                                                                        alt="avatar"
                                                                        style={{
                                                                            height: "10vh",
                                                                            width: "auto",
                                                                            marginLeft:
                                                                                "2vh",
                                                                        }}
                                                                    />
                                                                    <label
                                                                        htmlFor="file"
                                                                        style={{
                                                                            marginTop:
                                                                                "0",
                                                                            marginLeft:
                                                                                "2vh",
                                                                            cursor: "pointer",
                                                                            border: "1px solid #fffffe",
                                                                            padding:
                                                                                "1vh .5vh",
                                                                            borderRadius:
                                                                                "1vh",
                                                                        }}
                                                                    >
                                                                        Change
                                                                    </label>
                                                                </div>
                                                            )}
                                                            {!editedProfile.image_url && (
                                                                <label htmlFor="file">
                                                                    <AddPhotoAlternateIcon
                                                                        style={{
                                                                            color: "#fffffe",
                                                                            fontSize:
                                                                                "5vh",
                                                                            marginLeft:
                                                                                "2vh",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                </label>
                                                            )}
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                onChange={
                                                                    onImageChoose
                                                                }
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {errors && (
                                                        <div className="alert">
                                                            {Object.keys(
                                                                errors
                                                            ).map((key) => (
                                                                <p key={key}>
                                                                    {
                                                                        errors[
                                                                            key
                                                                        ][0]
                                                                    }
                                                                </p>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className={`form-button ${
                                                isChange ? "visible" : "hidden"
                                            }`}
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
