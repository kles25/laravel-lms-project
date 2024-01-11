import React from "react";
import "./profile.css";
import { useStateContext } from "../../../context/ContexProvider";

function ViewProfile() {
    const { user } = useStateContext();

    const baseURL = `${import.meta.env.VITE_API_BASE_URL}/`;
    const imageUrl = baseURL + user.image;

    return (
        <div className="profile-container">
            <div className="profile-holder">
                <div className="pages-row">
                    <div className="pages-col-12">
                        <div
                            className="profile-cover"
                            style={{
                                backgroundImage:
                                    'url("https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-grid-background_53876-129728.jpg?w=1380&t=st=1700700329~exp=1700700929~hmac=ea4e367a0a3f6ecd1406e4cf081b62cd838d3702b5d5927fb92908d0ae3e523e")',
                            }}
                        ></div>
                    </div>
                    <div className="pages-col-12">
                        <div className="profile-pic">
                            <img src={imageUrl} alt="profile" />
                            <h5 className="db-sub-title">{user.user_name}</h5>
                        </div>
                    </div>
                    <div className="pages-col-12">
                        <div className="profile-overview">
                            <hr />
                            <h3 className="db-sub-title">Overview</h3>
                            <div className="profile-details">
                                <div className="pages-row">
                                    <div className="pages-col-6">
                                        <div className="details-style">
                                            <label>NAME</label>
                                            <input
                                                placeholder={user.display_name}
                                                readOnly
                                            />
                                            <label>EMAIL</label>
                                            <input
                                                placeholder={user.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="pages-col-6">
                                        <div className="details-style">
                                            <label>ADDRESS</label>
                                            <input
                                                placeholder={user.address}
                                                readOnly
                                            />
                                            <label>PHONE NUMBER</label>
                                            <input
                                                placeholder={user.phone_number}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;
