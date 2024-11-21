import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operationsAuth"; // Import refreshUser
import { useAuth } from "./hooks/useAuth"; // Import custom hook

import Loader from "./components/commonComponents/Loader";
import VerifyEmailPage from "./pages/VerifyEmailPageComponent/VerifyEmailPageComponent";

import "./App.css";

// Lazy-loaded pages
const LazyCalculatorPage = React.lazy(() => import("./pages/CalculatorPage/CalculatorPage"));
const LazyDiaryPage = React.lazy(() => import("./pages/DiaryPage/DiaryPage"));
const LazyHomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const LazyLoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const LazyRegistrationPage = React.lazy(() => import("./pages/RegisterPage/RegisterPage"));

function App() {
  const { isLoggedIn, isRefreshing } = useAuth(); // Check user verification status
  const dispatch = useDispatch(); // To dispatch actions

  // Dispatch refreshUser when the app starts (or when page is refreshed)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />; // Loader while checking refresh status
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* Public Routes */}
          <Route
            index
            element={isLoggedIn ? (
              <LazyCalculatorPage />
            ) : (
              <LazyHomePage />
            )}
          />

          {/* Login & Registration Routes */}
          <Route
            path="register"
            element={
              <RestrictedRoute
                redirectTo={"verify-email"}
                component={<LazyRegistrationPage />}
              />
            }
          />

          <Route
            path="login"
            element={
              isLoggedIn ? <LazyCalculatorPage /> : <LazyLoginPage />
            }
          />

          {/* Email Verification */}
          <Route
            path="verify-email"
            element={<VerifyEmailPage />}
          />

          {/* Private Routes */}
          <Route
            path="calculator"
            element={<PrivateRoute component={<LazyCalculatorPage />} redirectTo="/verify-email" />}
          />

          <Route
            path="diary"
            element={<PrivateRoute component={<LazyDiaryPage />} redirectTo="/verify-email" />}
          />

          {/* Catch-All */}
          <Route path="*" element={<LazyHomePage />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
