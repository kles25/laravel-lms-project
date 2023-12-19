import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, enrolleeColumns } from "../../datatable/DataTable";

function AdminUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [selectedDataSource, setSelectedDataSource] = useState("users");

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setData(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "users") {
            setSelectedDataSource("users");
            setLoading(true);
            axiosClient
                .get("/users") // Fetch users' data
                .then(({ data }) => {
                    setLoading(false);
                    setData(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else if (selectedValue === "enrollees") {
            setSelectedDataSource("enrollees");
            setLoading(true);
            axiosClient
                .get("/enrollees")
                .then(({ data }) => {
                    setLoading(false);
                    setData(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            // Handle other cases if needed
        }
    };

    const getUsers = () => {
        if (selectedDataSource === "users") {
            axiosClient
                .get("/users")
                .then(({ data }) => {
                    setLoading(false);
                    setData(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else if (selectedDataSource === "enrollees") {
            axiosClient
                .get("/enrollees")
                .then(({ data }) => {
                    setLoading(false);
                    setData(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.user_code}`).then(() => {
            setNotification("User was successfully deleted");
            getUsers();
        });
    };

    const onDeleteEnrollee = (enrolled) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/enrollees/${enrolled.id}`).then(() => {
            setNotification("User was successfully deleted");
            getUsers();
        });
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cell-action">
                        <Link
                            className="btn-edit"
                            to={"/admin/users/" + params.row.user_code}
                        >
                            Edit
                        </Link>
                        &nbsp;
                        <button
                            className="btn-delete"
                            onClick={(ev) => onDeleteClick(params.row)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    const actionEnroll = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cell-action">
                        <Link
                            className="btn-edit"
                            to={"/admin/enrolled/" + params.row.id}
                        >
                            Edit
                        </Link>
                        &nbsp;
                        <button
                            className="btn-delete"
                            onClick={(ev) => onDeleteEnrollee(params.row)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    const UserGrid = () => {
        return (
            <div className="dashboard-users-table">
                {loading && <div className="loader-two"></div>}
                {!loading && (
                    <DataGrid
                        style={{
                            color: "#fffffe",
                            fontWeight: "300",
                            backgroundColor: "#071c30e6",
                        }}
                        className="datagrid"
                        getRowId={(row) => row.user_code}
                        rows={data}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                    />
                )}
            </div>
        );
    };

    const EnrolleeGrid = () => {
        return (
            <div className="dashboard-users-table">
                {loading && <div className="loader-two"></div>}
                {!loading && (
                    <DataGrid
                        style={{
                            color: "#fffffe",
                            fontWeight: "300",
                            backgroundColor: "#071c30e6",
                        }}
                        className="datagrid"
                        getRowId={(row) => row.id}
                        rows={data}
                        columns={enrolleeColumns.concat(actionEnroll)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <h3 className="dashboard-title">Users</h3>
                <Link className="dashboard-link-right" to="/admin/createusers">
                    <h3 className="dashboard-title">Create Users</h3>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
            <div className="pages-col-4">
                <div className="form-input">
                    <select onChange={handleDropdownChange}>
                        <option value="users">Users Data</option>
                        <option value="enrollees">Enrollees Data</option>
                    </select>
                </div>
            </div>

            {selectedDataSource === "users" ? <UserGrid /> : <EnrolleeGrid />}
        </div>
    );
}

export default AdminUsers;
