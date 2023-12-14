import { Navigate, Route, Routes } from "react-router-dom";
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

function App() {
    const { role } = useStateContext();

    // Function to check if the user is logged in as a specific role
    const isRole = (allowedRoles) => {
        return allowedRoles.includes(role);
    };

    return (
        <Routes>
            <Route
                path="/"
                component={<Home />}
                children={[
                    { path: "/signup", component: <SignUp /> },
                    { path: "/signin", component: <SignIn /> },
                ]}
            />
            <Route
                path="/admin"
                component={
                    isRole(["admin"]) ? (
                        <AdminDashboard />
                    ) : (
                        <Navigate to="/unauthorized" replace />
                    )
                }
                children={[
                    {
                        path: "/admin",
                        component: <Navigate to="/admin/home" />,
                    },
                    {
                        path: "home",
                        component: <AdminHome />,
                    },
                    {
                        path: "/admin/courses",
                        component: <AdminCourses />,
                    },
                    {
                        path: "/admin/users",
                        component: <AdminUsers />,
                    },
                    {
                        path: "/admin/users/:user_code",
                        component: <AdminCreateUsers />,
                    },
                    {
                        path: "/admin/createusers",
                        component: <AdminCreateUsers />,
                    },
                    {
                        path: "/admin/batch",
                        component: <AdminBatches />,
                    },
                    {
                        path: "/admin/calendar",
                        component: <AdminCalendar />,
                    },
                    {
                        path: "/admin/profile",
                        component: <AdminProfile />,
                    },
                ]}
            />
            <Route
                path="/teacher"
                component={
                    isRole(["teacher"]) ? (
                        <TeacherDashboard />
                    ) : (
                        <Navigate to="/unauthorized" replace />
                    )
                }
                children={[
                    {
                        path: "/teacher",
                        component: <Navigate to="/teacher/home" />,
                    },
                    {
                        path: "/teacher/home",
                        component: <TeacherHome />,
                    },
                    {
                        path: "/teacher/classes",
                        component: <TeacherClasses />,
                    },
                    {
                        path: "/teacher/homework",
                        component: <TeacherHomework />,
                    },
                    {
                        path: "/teacher/quiz",
                        component: <TeacherQuizzes />,
                    },
                    {
                        path: "/teacher/test",
                        component: <TeacherTest />,
                    },
                    {
                        path: "/teacher/grades",
                        component: <TeacherGrades />,
                    },
                    {
                        path: "/teacher/calendar",
                        component: <TeacherCalendar />,
                    },
                    {
                        path: "/teacher/profile",
                        component: <TeacherProfile />,
                    },
                ]}
            />
            <Route
                path="/student"
                component={
                    isRole(["student"]) ? (
                        <StudentDashboard />
                    ) : (
                        <Navigate to="/unauthorized" replace />
                    )
                }
                children={[
                    {
                        path: "/student",
                        component: <Navigate to="/student/home" />,
                    },
                    {
                        path: "/student/home",
                        component: <TeacherHome />,
                    },
                    {
                        path: "/student/classes",
                        component: <TeacherClasses />,
                    },
                    {
                        path: "/student/homework",
                        component: <TeacherHomework />,
                    },
                    {
                        path: "/student/quiz",
                        component: <TeacherQuizzes />,
                    },
                    {
                        path: "/student/test",
                        component: <TeacherTest />,
                    },
                    {
                        path: "/student/grades",
                        component: <TeacherGrades />,
                    },
                    {
                        path: "/student/calendar",
                        component: <TeacherCalendar />,
                    },
                    {
                        path: "/student/profile",
                        component: <TeacherProfile />,
                    },
                ]}
            />
            {/* Define other routes */}
            <Route path="*" component={<NotFound />} />
            <Route path="/unauthorized" component={<UnAuthorized />} />
            <Route path="/dashboard" component={<Dashboard />} />
        </Routes>
    );
}

export default App;
