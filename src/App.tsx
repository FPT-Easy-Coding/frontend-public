import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Homepage from "./pages/guest/homepage/Homepage";
import { action as authAction } from "./pages/authentication/authpage/AuthPage";
import logout from "./utils/loader/auth/logout";
import {
  checkAuth,
  getAuthCredentials,
  isLoggedIn,
  preventAuth,
} from "./utils/loader/auth/auth";
import "@mantine/core/styles.css";
import { ErrorPage } from "./pages/errorpage/ErrorPage";
import {
  forgotPasswordAction,
  resetPasswordAction,
} from "./utils/action/forgot-password/ForgotPasswordAction";
import {
  loader as SetLoader,
  action as SetAction,
} from "./pages/quiz/set/SetDetails";
import StudyModeRoot from "./pages/study-mode/StudyModeRoot";
import { loader as FlashcardLoader } from "./pages/study-mode/flashcard/FlashcardPage";
import { action as NavbarAction } from "./pages/Root";
import { lazy, Suspense } from "react";
import { Box, LoadingOverlay } from "@mantine/core";
import LearnPage from "./pages/study-mode/learn/LearnPage";
import ClassQuestionPage from "./pages/class/ClassQuestionPage";
import { classAction } from "./pages/class/ClassPage";

const AuthPage = lazy(() => import("./pages/authentication/authpage/AuthPage"));
const ForgotPassword = lazy(
  () => import("./pages/authentication/forgot-password/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("./pages/authentication/forgot-password/ResetPassword")
);
// const UserDashboard = lazy(() => import("./pages/after_login/UserDashboard"));
const UserDashboard = lazy<React.ComponentType<any>>(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("./pages/after_login/UserDashboard")),
      1500
    );
  });
});

const ProfilePage = lazy(() => import("./pages/account/user/ProfilePage"));

const ClassPage = lazy(() => import("./pages/class/ClassPage"));
const CreateQuizPage = lazy(
  () => import("./pages/quiz/create_form/CreateQuizPage")
);

const FolderPage = lazy(() => import("./pages/folder/FolderPage"));
const SetDetails = lazy(() => import("./pages/quiz/set/SetDetails"));
const FlashcardMode = lazy(
  () => import("./pages/study-mode/flashcard/FlashcardPage")
);
const loadingIndicator = (
  <Box pos={"relative"} h={"100vh"} w={"100vw"}>
    <LoadingOverlay
      visible
      zIndex={0}
      overlayProps={{ radius: "sm", blur: 0, backgroundOpacity: 0 }}
      loaderProps={{ color: "orange", type: "oval" }}
    />
  </Box>
);

const router = createBrowserRouter([
  {
    path: "/",
    loader: getAuthCredentials,
    action: NavbarAction,
    id: "root-loader",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
        loader: async () => {
          if (isLoggedIn()) {
            return redirect("/home");
          }
          return null;
        },
      },
      {
        path: "auth",
        element: (
          <Suspense fallback={loadingIndicator}>
            <AuthPage />
          </Suspense>
        ),
        action: authAction,
        loader: preventAuth,
      },
      {
        path: "forgotten",
        element: (
          <Suspense fallback={loadingIndicator}>
            <ForgotPassword />
          </Suspense>
        ),
        action: forgotPasswordAction,
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback={loadingIndicator}>
            <ResetPassword />
          </Suspense>
        ),
        action: resetPasswordAction,
      },
      {
        path: "home",
        element: (
          <Suspense fallback={loadingIndicator}>
            <UserDashboard />
          </Suspense>
        ),
        loader: checkAuth,
      },
      {
        path: "user/profile/:tab",
        loader: getAuthCredentials,
        id: "profile-loader",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={loadingIndicator}>
                <ProfilePage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "class/:id/",
        children: [
          {
            path: ":tab",
            action: classAction,
            element: (
              <Suspense fallback={loadingIndicator}>
                <ClassPage />
              </Suspense>
            ),
          },
          {
            path: "discussion/question/:questionId",
            element: (
              <Suspense fallback={loadingIndicator}>
                <ClassQuestionPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "create-quiz",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={loadingIndicator}>
                <CreateQuizPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "folder/:id",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={loadingIndicator}>
                <FolderPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "quiz/set/:id",
        loader: checkAuth,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={loadingIndicator}>
                <SetDetails />
              </Suspense>
            ),
            loader: SetLoader,
            action: SetAction,
          },
        ],
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
        element: (
          <Suspense fallback={loadingIndicator}>
            <FlashcardMode />
          </Suspense>
        ),
        loader: FlashcardLoader,
      },
      {
        path: "learn",
        element: (
          <Suspense fallback={loadingIndicator}>
            <LearnPage />
          </Suspense>
        ),
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
