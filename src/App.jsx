// use the { } if you're not importing the default
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

const handleClick  = () => {
  window.history.replaceState({}, 'foo', '/foo');
  window.open("http://www.bom.gov.au/","_blank");
  window.location.replace("https://google.com");
};

const HeaderLayout = () => (
  <section>
    <Nav />
    <Outlet />
    <div>
    <button id="quick-exit" onClick={handleClick}>Quick exit</button>
  </div>
  </section>
);

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