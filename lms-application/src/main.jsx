import React from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import router from "./router.jsx";
import { ContextProvider } from "./context/ContexProvider";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
);
