// use the { } if you're not importing the default
import { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Smooth curled brackets is an implicit return

// Pages
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";

// Components
import Nav from "./components/Nav/Nav";

// CSS
import "./App.css"

const HeaderLayout = () => {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null)
  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LogInPage />},
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/create-project", element: <CreateProjectPage />},
      { path: "/signout", element: <HomePage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;