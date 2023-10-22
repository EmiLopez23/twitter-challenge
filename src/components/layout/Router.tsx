import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { StyledSideBarPageWrapper } from "../../pages/side-bar-page/SideBarPageWrapper";
import NavBar from "../navbar/NavBar";
import SignUpPage from "../../pages/auth/sign-up/SignUpPage";
import SignInPage from "../../pages/auth/sign-in/SignInPage";
import HomePage from "../../pages/home-page/HomePage";
import RecommendationPage from "../../pages/recommendation/RecommendationPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import TweetPage from "../../pages/create-tweet-page/TweetPage";
import CommentPage from "../../pages/create-comment-page/CommentPage";
import PostPage from "../../pages/post-page/PostPage";
import { ROUTES } from "../../util/Constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.user.token);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.SIGN_IN} />
  );
};

const AuthRoute = () => {
  const token = useSelector((state: RootState) => state.user.token);
  return token ? (
    <Navigate to={ROUTES.HOME} />
  ) : (
    <Outlet />
  );
};

const WithNav = () => {
  return (
    <StyledSideBarPageWrapper>
      <NavBar />
      <Outlet />
    </StyledSideBarPageWrapper>
  );
};

export const ROUTER = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: [
      {
        path: ROUTES.SIGN_UP,
        element: <SignUpPage />,
      },
      {
        path: ROUTES.SIGN_IN,
        element: <SignInPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <WithNav />,
        children: [
          {
            path: ROUTES.HOME,
            element: <HomePage />,
          },
          {
            path: ROUTES.RECOMMENDATIONS,
            element: <RecommendationPage />,
          },
          {
            path: `${ROUTES.PROFILE}/:id`,
            element: <ProfilePage />,
          },
          {
            path: `${ROUTES.POST}/:id`,
            element: <PostPage />,
          },
          {
            path: ROUTES.TWEET,
            element: <TweetPage />,
          },
          {
            path: `${ROUTES.POST}/:id`,
            element: <CommentPage />,
          },
        ],
      },
    ],
  },
]);
