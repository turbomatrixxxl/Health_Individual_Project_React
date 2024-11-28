import React, { useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
import { usePrivate } from "../../hooks/usePrivate";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import clsx from "clsx";

import styles from './SharedLayout.module.css';


function SharedLayout() {
  const { isLoggedIn, errorAuth, isLoggedOut } = useAuth();
  const { message, error } = usePrivate()

  const [toastShown, setToastShown] = useState(false);
  const [logoutShown, setLogoutShown] = useState(false);



  useEffect(() => {
    if (isLoggedIn && !toastShown) {
      toast.success("Login successful!");
      setToastShown(true); // Ensure the toast doesn't show again
    }

    if (isLoggedOut && !logoutShown) {
      toast.success("Logout successful!");
      setLogoutShown(true);
    }

    if (error || errorAuth) {
      toast.error(error || errorAuth.message);
    };

    if (message) {
      toast.success(message)
    }
  }, [error, message, isLoggedIn, toastShown, errorAuth])

  return (
    <div className={styles.cont}>
      {!isLoggedIn && <div className={clsx(styles.content, styles.notLoggedIn)}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>}
      {isLoggedIn && <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Outlet />
          <ToastContainer />
        </main>
      </div>}
      <Footer />
    </div>
  );
}

export default SharedLayout;
