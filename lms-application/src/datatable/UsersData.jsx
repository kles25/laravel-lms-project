import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { userColumns } from "./DataTable";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContexProvider";

function UsersData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const getUsers = () => {
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
    };

    useEffect(() => {
        getUsers();
    }, []);

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
                            to={"/admin/users/" + params.row.id}
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

    const onDeleteClick = (data) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${data.id}`).then(() => {
            setNotification("User was successfully deleted");
            getUsers();
        });
    };

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
                    columns={userColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                />
            )}
        </div>
    );
}

export default UsersData;
