import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
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
import ClassPage from "./pages/class/ClassPage";
import logout from "./utils/loader/auth/logout";
import {
  checkAuth,
  getAuthCredentials,
  preventAuth,
} from "./utils/loader/auth/auth";
import "@mantine/core/styles.css";
import UserDashboard from "./pages/after_login/UserDashboard";
import { ErrorPage } from "./pages/errorpage/ErrorPage";
import {
  forgotPasswordAction,
  resetPasswordAction,
} from "./utils/action/forgot-password/ForgotPasswordAction";
import SetDetails from "./pages/quiz/set/SetDetails";
import { loader as SetLoader } from "./pages/quiz/set/SetDetails";
import FlashcardMode from "./pages/study-mode/flashcard/FlashcardPage";
import FolderPage from "./pages/folder/FolderPage";
import CreateQuizPage from "./pages/quiz/create_form/CreateQuizPage";
import StudyModeRoot from "./pages/study-mode/StudyModeRoot";
import { loader as FlashcardLoader } from "./pages/study-mode/flashcard/FlashcardPage";
import { action as NavbarAction } from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    loader: getAuthCredentials,
    action: NavbarAction,
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
        action: forgotPasswordAction,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
        action: resetPasswordAction,
      },
      { path: "home", element: <UserDashboard />, loader: checkAuth },
      {
        path: "user/profile/:tab",
        loader: getAuthCredentials,
        id: "profile-loader",
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "class/:id",
        children: [
          {
            index: true,
            element: <ClassPage />,
          },
        ],
      },
      {
        path: "create-quiz",
        children: [
          {
            index: true,
            element: <CreateQuizPage />,
          },
        ],
      },
      {
        path: "folder/:id",
        children: [
          {
            index: true,
            element: <FolderPage />,
          },
        ],
      },
      {
        path: "quiz/set/:id",
        loader: checkAuth,
        children: [{ index: true, element: <SetDetails />, loader: SetLoader }],
      },
      { path: "logout", action: logout },
    ],
  },
  {
    path: ":id/study",
    element: <StudyModeRoot />,
    errorElement: <ErrorPage />,
    loader: checkAuth,
    children: [
      {
        path: "flashcard",
        element: <FlashcardMode />,
        loader: FlashcardLoader,
      },
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
