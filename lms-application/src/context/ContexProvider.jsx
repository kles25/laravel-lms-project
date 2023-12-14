import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    role: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState("");
    const [role, setRole] = useState(localStorage.getItem("USER_ROLE"));

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch user data when the token exists
        if (token) {
            axiosClient
                .get("/user")
                .then(({ data }) => {
                    setUser(data);
                    setRole(data.role);
                    setIsLoading(false); // Set loading to false once user data is fetched
                    localStorage.setItem("USER_ROLE", data.role);
                })
                .catch((error) => {
                    // Handle error and unauthorized status
                    setIsLoading(false); // Set loading to false even on error
                    if (error.response && error.response.status === 401) {
                        // ...
                    }
                });
        } else {
            setIsLoading(false); // Set loading to false if there's no token
        }
    }, [token]);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("USER_ROLE");
            window.location.reload();
        }
    };

    const setNotification = (message) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    const updateUser = (userData, userRole) => {
        setUser(userData);
        setRole(userRole);
        localStorage.setItem("USER_ROLE", userRole);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser: updateUser,
                token,
                setToken,
                notification,
                setNotification,
                role,
                updateUser,
                isLoading,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
