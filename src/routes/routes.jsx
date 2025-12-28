import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Home from '../pages/home.jsx'
import Login from "../pages/login.jsx";
import SignUp from "../pages/signup.jsx";
import Profile from "../pages/profile.jsx"

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/profile", element: <Profile /> }
        ]
    }
]);

export default router;