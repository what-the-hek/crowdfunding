// use the { } if you're not importing the default
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Smooth curled brackets is an implicit return

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";

// Components
import Nav from "./components/Nav/nav";

// CSS
import "./App.css"


const handleClick  = () => {
  window.history.replaceState({}, 'foo', '/foo');
  window.open("http://www.bom.gov.au/","_blank");
  window.location.replace("https://google.com");
};

const HeaderLayout = () => (
  <div>
    <Nav />
    <Outlet />
    <button id="quick-exit" onClick={handleClick}>Quick exit</button>
  </div>
);

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/project/:id", element: <ProjectPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;