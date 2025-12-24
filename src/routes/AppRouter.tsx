import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/HomePage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

    {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/home",
    element: <Home/>
  },
]);



