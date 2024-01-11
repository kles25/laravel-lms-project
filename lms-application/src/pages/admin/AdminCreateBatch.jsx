import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import BatchAdd from "../../components/dashboard/admin/batches/BatchAdd";

function AdminCreateBatch() {
    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <Link className="dashboard-link-left" to="/admin/batch">
                    <ArrowBackIosIcon />
                    <h3 className="dashboard-title">Batches</h3>
                </Link>
                <h3 className="dashboard-title">Create Batch</h3>
            </div>
            <div>
                <BatchAdd />
            </div>
        </div>
    );
}

export default AdminCreateBatch;
