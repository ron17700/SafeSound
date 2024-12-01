import React, { useMemo, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./Types/Routes";
import "./styles/default-style.scss";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";


const router = createBrowserRouter([
  {
    path: `/`,
    element: <Login />,
  }, {
    path: `/${ROUTES.LOGIN}`,
    element: <Login />,
  },
]);

export const App: React.FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};
