import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Homepage from "./pages/guest/homepage/Homepage";
import AuthPage, {
  action as authAction,
} from "./pages/authentication/authpage/AuthPage";
import ForgotPassword from "./pages/authentication/forgot-password/ForgotPassword";
import ResetPassword from "./pages/authentication/forgot-password/ResetPassword";
import ProfilePage from "./pages/account/user/ProfilePage";
import logout from "./utils/loader/auth/logout";
import {
  checkAuth,
  getAuthCredentials,
  preventAuth,
} from "./utils/loader/auth/auth";
import "@mantine/core/styles.css";
import UserDashboard from "./pages/after_login/UserDashboard";
import { ErrorPage } from "./pages/errorpage/ErrorPage";
import { forgotPasswordAction, resetPasswordAction } from "./utils/action/forgot-password/ForgotPasswordAction";
import SetDetails from "./pages/quiz/set/SetDetails";
import { loader as SetLoader } from "./pages/quiz/set/SetDetails";
import FlashcardMode from "./pages/study-mode/flashcard/FlashcardPage";

const router = createBrowserRouter([
  {
    path: "/",
    loader: getAuthCredentials,
    id: "root-loader",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
        loader: preventAuth,
      },
      {
        path: "forgotten",
        element: <ForgotPassword />,
        action: forgotPasswordAction
      },
      { path: "reset-password", element: <ResetPassword />, action: resetPasswordAction},
      { path: "home", element: <UserDashboard />, loader: checkAuth },
      {
        path: "user",
        children: [{ index: true, path: "profile", element: <ProfilePage /> }],
      },
      {
        path: "quiz/set/:id",
        loader: checkAuth,
        children: [
          { index: true, element: <SetDetails />, loader: SetLoader },
          { path: "flashcard", element: <FlashcardMode /> },
        ],
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
