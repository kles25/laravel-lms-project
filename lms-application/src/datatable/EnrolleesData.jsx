import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { enrolleeColumns } from "./DataTable";
import { useStateContext } from "../context/ContexProvider";

function EnrolleesData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const getEnrollees = () => {
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
    };

    useEffect(() => {
        getEnrollees();
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
                        &nbsp;
                        <button
                            className="btn-enroll"
                            onClick={() => onEnrollStudent(params.row)}
                        >
                            Enroll
                        </button>
                    </div>
                );
            },
        },
    ];

    const onDeleteEnrollee = (data) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/enrollees/${data.id}`).then(() => {
            setNotification("User was successfully deleted");
            getEnrollees();
        });
    };

    const onEnrollStudent = (data) => {
        axiosClient
            .post("/students", data) // Assuming data contains student details
            .then(() => {
                setNotification("Enrolled successfully as a student");

                // Perform a DELETE request to remove the enrolled user
                axiosClient
                    .delete(`/enrollees/${data.id}`)
                    .then(() => {
                        console.log(
                            "Enrollee has been enrolled and deleted succesfully"
                        );
                        // Optionally, perform additional actions after deletion
                        // For example, refreshing the list of enrollees
                        getEnrollees();
                    })
                    .catch((error) => {
                        console.error(
                            "Error deleting enrolled student: ",
                            error
                        );
                    });
            })
            .catch((error) => {
                console.error("Error enrolling as a student: ", error);
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
                    columns={enrolleeColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                />
            )}
        </div>
    );
}

export default EnrolleesData;
