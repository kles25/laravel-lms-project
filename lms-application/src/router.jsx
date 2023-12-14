import { Navigate, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Home from "./pages/home/Home";
import NotFound from "./pages/errorpage/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBatches from "./pages/admin/AdminBatches";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminCreateUsers from "./pages/admin/AdminCreateUsers";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherHome from "./pages/teacher/TeacherHome";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherHomework from "./pages/teacher/TeacherHomework";
import TeacherQuizzes from "./pages/teacher/TeacherQuizzes";
import TeacherTest from "./pages/teacher/TeacherTest";
import TeacherCalendar from "./pages/teacher/TeacherCalendar";
import TeacherGrades from "./pages/teacher/TeacherGrades";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import StudentDashboard from "./pages/student/StudentDashboard";
import UnAuthorized from "./pages/errorpage/UnAuthorized";
import Dashboard from "./pages/dashboard/Dashboard";
import { useStateContext } from "./context/ContexProvider";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { user, isLoading } = useStateContext();

    if (isLoading) {
        // Render a loading indicator or handle loading state
        return <div className="loader"></div>;
    }

    if (!user || !user.role) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/signin" />;
    }

    if (allowedRoles.includes(user.role)) {
        return element;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/signin",
                element: <SignIn />,
            },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute
                element={<AdminDashboard />}
                allowedRoles={["admin"]}
            />
        ),
        children: [
            {
                path: "/admin",
                element: <Navigate to="/admin/home" />,
            },
            {
                path: "home",
                element: <AdminHome />,
            },
            {
                path: "/admin/courses",
                element: <AdminCourses />,
            },
            {
                path: "/admin/users",
                element: <AdminUsers />,
            },
            {
                path: "/admin/users/:user_code",
                element: <AdminCreateUsers />,
            },
            {
                path: "/admin/createusers",
                element: <AdminCreateUsers />,
            },
            {
                path: "/admin/batch",
                element: <AdminBatches />,
            },
            {
                path: "/admin/calendar",
                element: <AdminCalendar />,
            },
            {
                path: "/admin/profile",
                element: <AdminProfile />,
            },
        ],
    },
    {
        path: "/teacher",
        element: (
            <ProtectedRoute
                element={<TeacherDashboard />}
                allowedRoles={["teacher"]}
            />
        ),
        children: [
            {
                path: "/teacher",
                element: <Navigate to="/teacher/home" />,
            },
            {
                path: "/teacher/home",
                element: <TeacherHome />,
            },
            {
                path: "/teacher/classes",
                element: <TeacherClasses />,
            },
            {
                path: "/teacher/homework",
                element: <TeacherHomework />,
            },
            {
                path: "/teacher/quiz",
                element: <TeacherQuizzes />,
            },
            {
                path: "/teacher/test",
                element: <TeacherTest />,
            },
            {
                path: "/teacher/grades",
                element: <TeacherGrades />,
            },
            {
                path: "/teacher/calendar",
                element: <TeacherCalendar />,
            },
            {
                path: "/teacher/profile",
                element: <TeacherProfile />,
            },
        ],
    },
    {
        path: "/student",
        element: (
            <ProtectedRoute
                element={<StudentDashboard />}
                allowedRoles={["student"]}
            />
        ),
        children: [
            {
                path: "/student",
                element: <Navigate to="/student/home" />,
            },
            {
                path: "/student/home",
                element: <TeacherHome />,
            },
            {
                path: "/student/classes",
                element: <TeacherClasses />,
            },
            {
                path: "/student/homework",
                element: <TeacherHomework />,
            },
            {
                path: "/student/quiz",
                element: <TeacherQuizzes />,
            },
            {
                path: "/student/test",
                element: <TeacherTest />,
            },
            {
                path: "/student/grades",
                element: <TeacherGrades />,
            },
            {
                path: "/student/calendar",
                element: <TeacherCalendar />,
            },
            {
                path: "/student/profile",
                element: <TeacherProfile />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/unauthorized",
        element: <UnAuthorized />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

export default router;
