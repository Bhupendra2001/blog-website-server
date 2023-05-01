import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import  {Navbar}  from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";

import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import './style.scss'
import LoginSample from "./pages/LoginSample";
import Post from "./pages/Post";
import { UpdateBlog } from "./pages/UpdateBlog";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginSample />,
  },
  {
    path: "/write",
    element: <Write />,
  },
  {
    path: "/single",
    element: <Single />,
  },
  {
    path: "/create",
    element: <Post />,
  },
  {
    path : '/update/:blogId/:userId',
    element : <UpdateBlog/>
  }
]);

function App() {
  return (
    <div className="app">
   <div className="container">

     <RouterProvider router={router} />
   </div>

    </div>
  );
}

export default App;
