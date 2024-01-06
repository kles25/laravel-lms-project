import { Link, Outlet, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function AdminUsers() {
    const navigate = useNavigate();

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        switch (selectedValue) {
            case "users":
                navigate("/admin/users");
                break;
            case "enrollees":
                navigate("/admin/users/enrollees");
                break;
            case "students":
                navigate("/admin/users/students");
                break;
            default:
                // Handle other cases if needed
                break;
        }
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
                        <option value="users">Users</option>
                        <option value="enrollees">Enrollees</option>
                        <option value="students">Students</option>
                    </select>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default AdminUsers;
