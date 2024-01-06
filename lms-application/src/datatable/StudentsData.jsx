import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { DataGrid } from "@mui/x-data-grid";
import { studentColumns } from "./DataTable";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContexProvider";

function StudentsData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const getStudents = () => {
        setLoading(true);
        axiosClient
            .get("/students")
            .then(({ data }) => {
                setLoading(false);
                setData(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getStudents();
    }, []);

    const onDeleteStudent = (data) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/students/${data.id}`).then(() => {
            setNotification("Student was successfully deleted");
            console.log("Student was successfully deleted");
            getStudents();
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
                            to={"/admin/students/" + params.row.id}
                        >
                            Edit
                        </Link>
                        &nbsp;
                        <button
                            className="btn-delete"
                            onClick={(e) => onDeleteStudent(params.row)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

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
                    columns={studentColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                />
            )}
        </div>
    );
}

export default StudentsData;
