import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import BatchList from "../../components/dashboard/admin/batches/BatchList";

function AdminBatches() {
    return (
        <div className="dashboard-section-content">
            <div className="dashboard-title-holder">
                <h3 className="dashboard-title">Batches</h3>
                <Link className="dashboard-link-right" to="/admin/create-batch">
                    <h3 className="dashboard-title">Create Batch</h3>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
            <BatchList />
        </div>
    );
}

export default AdminBatches;
