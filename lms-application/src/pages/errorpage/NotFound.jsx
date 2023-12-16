import React, { useEffect } from "react";
import "./errorpage.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            // Redirect to the home page after 5 seconds
            navigate("/");
        }, 5000); // 5 seconds

        return () => clearTimeout(redirectTimeout);
    }, []);

    return (
        <div className="default-page-container">
            <div className="loader"></div>
            <div className="">
                <h3 className="loading-text">
                    Page Not Found
                    <span data-text=".">.</span>
                    <span data-text=".">.</span>
                    <span data-text=".">.</span>
                </h3>
            </div>
        </div>
    );
}

export default NotFound;
