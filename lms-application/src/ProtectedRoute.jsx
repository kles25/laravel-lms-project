import React from "react";
import { Routes, Navigate } from "react-router-dom";
import { useStateContext } from "./context/ContexProvider";

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
    const { user } = useStateContext();

    if (!user || !allowedRoles.includes(user.role)) {
        // Redirect to a default route or unauthorized route
        return <Navigate to="/unauthorized" />;
    }

    return <Routes {...rest} element={<Component />} />;
};

export default ProtectedRoute;
