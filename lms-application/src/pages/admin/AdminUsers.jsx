import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useStateContext } from "../../context/ContexProvider";
import axiosClient from "../../axios-client";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatable/UsersTable";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);

        // Introduce a 5-second delay before making the API call
        setTimeout(() => {
            axiosClient
                .get("/users")
                .then(({ data }) => {
                    setLoading(false);
                    setUsers(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, 5000); // 5 seconds delay
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

    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <h3 className="dashboard-title">Users</h3>
                <Link className="dashboard-link-right" to="/admin/createusers">
                    <h3 className="dashboard-title">Create Users</h3>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
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
                        rows={users}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                    />
                )}
            </div>
        </div>
    );
}

export default AdminUsers;
