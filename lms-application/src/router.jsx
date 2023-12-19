import { Navigate, createBrowserRouter } from "react-router-dom";
import { useStateContext } from "./context/ContexProvider";
import { useEffect, useState } from "react";
import SignIn from "./pages/signin/SignIn";
import Home from "./pages/home/Home";
import NotFound from "./pages/errorpage/NotFound";
import UnAuthorized from "./pages/errorpage/UnAuthorized";
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
import StudentHome from "./pages/student/StudentHome";
import StudentClasses from "./pages/student/StudentClasses";
import StudentHomework from "./pages/student/StudentHomework";
import StudentQuizzes from "./pages/student/StudentQuizzes";
import StudentTest from "./pages/student/StudentTest";
import StudentGrades from "./pages/student/StudentGrades";
import StudentCalendar from "./pages/student/StudentCalendar";
import StudentProfile from "./pages/student/StudentProfile";
import Enrollment from "./pages/enrollment/Enrollment";
import AdminViewEnrollee from "./pages/admin/AdminViewEnrollee";

const TIMEOUT_DURATION = 3000;

const DelayedRoute = ({ element }) => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, TIMEOUT_DURATION);

        return () => clearTimeout(timer);
    }, []);

    return showLoader ? (
        <div className="default-page-container">
            <div className="loader"></div>
            <div className="">
                <h3 className="loading-text">
                    Redirecting
                    <span data-text=".">.</span>
                    <span data-text=".">.</span>
                    <span data-text=".">.</span>
                </h3>
            </div>
        </div>
    ) : (
        element
    );
};

const ProtectedRoute = ({ element, allowedRoles, path }) => {
    const { user, isLoading } = useStateContext();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false); // Set showLoader to false after 5 seconds
        }, 3000); // 5 seconds delay

        return () => clearTimeout(timer); // Clear timeout on unmounting or change
    }, []);

    if (isLoading || showLoader) {
        // Render a loading indicator or handle loading state
        return (
            <div className="default-page-container">
                <div className="loader"></div>
                <div className="">
                    <h3 className="loading-text">
                        Verifying User
                        <span data-text=".">.</span>
                        <span data-text=".">.</span>
                        <span data-text=".">.</span>
                    </h3>
                </div>
            </div>
        );
    }

    if (!user || !user.role) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/signin" />;
    }

    if (user && user.role && path === "/signin") {
        // Redirect to home if the user is already signed in and trying to access /signin
        return <Navigate to="/" />;
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
        element: <DelayedRoute element={<Home />} />,
        children: [
            {
                path: "/signin",
                element: <SignIn />,
            },
            {
                path: "/enrollment",
                element: <Enrollment />,
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
                path: "/admin/enrolled/:id",
                element: <AdminViewEnrollee />,
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
                element: <StudentHome />,
            },
            {
                path: "/student/classes",
                element: <StudentClasses />,
            },
            {
                path: "/student/homework",
                element: <StudentHomework />,
            },
            {
                path: "/student/quiz",
                element: <StudentQuizzes />,
            },
            {
                path: "/student/test",
                element: <StudentTest />,
            },
            {
                path: "/student/grades",
                element: <StudentGrades />,
            },
            {
                path: "/student/calendar",
                element: <StudentCalendar />,
            },
            {
                path: "/student/profile",
                element: <StudentProfile />,
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
]);

export default router;
