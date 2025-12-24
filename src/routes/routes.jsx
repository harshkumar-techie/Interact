import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Home from '../pages/home.jsx'
import Login from "../pages/login.jsx";
import SignUp from "../pages/signup.jsx";

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
            { path: "/home", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> }
        ]
    }
]);

export default router;