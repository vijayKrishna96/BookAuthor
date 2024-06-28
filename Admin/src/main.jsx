import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root";
import Home,{loader as homeLoader} from "./Components/Home";
import AddBook from "./Components/addBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path : '/',
        element : <Home />,
        loader: homeLoader
      },
      {
        path: '/new',
        element: <AddBook />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
