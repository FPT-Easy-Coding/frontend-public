import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Signup, {
  action as signupAction,
} from "./pages/authentication/Register/Signup";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Homepage from "./pages/Homepage";
import Login, {
  action as loginAction,
} from "./pages/authentication/Login/Login";
import ForgotPassword from "./pages/authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/authentication/ForgotPassword/ResetPassword";
import ProfilePage from "./pages/account/user/ProfilePage";
import logout from "./utils/loader/auth/logout";
import { getAuthCredentials } from "./utils/loader/auth/auth";


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    loader: getAuthCredentials,
    id: "root-loader",
    element: <Root />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "signup", element: <Signup />, action: signupAction },
      { path: "login", element: <Login />, action: loginAction },
      {
        path: "forgotten",
        children: [
          {
            index: true,
            element: <ForgotPassword />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
        ],
      },
      { path: "home", element: <Homepage /> },
      {
        path: "user",
        children: [{ path: "profile", element: <ProfilePage /> }],
      },
      { path: "logout", action: logout },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        stacked
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
