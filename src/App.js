import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Erroe404 from "./pages/erroe404";
import "./context/theme.css";
import Profile from "./pages/Profile";
import "./comp/Header.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from "./pages/singin/Singin";
import Signup from "./pages/Signup";
import "./comp/MainContent.css";
import EditTask from "./pages/edit-task/editTask";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Erroe404 />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/edit-task/:idString",
    element: <EditTask />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
