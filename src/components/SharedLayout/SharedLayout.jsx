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
  const { isLoggedIn, isLoggedOut, isRegistered } = useAuth();
  const { message } = usePrivate()

  const [toastShown, setToastShown] = useState(false);
  const [logoutShown, setLogoutShown] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      toast.success("Registration successful!");
    }
  }, [isRegistered]);

  useEffect(() => {
    if (isLoggedIn && !toastShown) {
      toast.success("Login successful!");
      setToastShown(true);
      setLogoutShown(false);
    }
  }, [isLoggedIn, toastShown]);

  useEffect(() => {
    if (isLoggedOut && !logoutShown) {
      toast.success("You are not Logged in!");
      setLogoutShown(true);
      setToastShown(false);
    }
  }, [isLoggedOut, logoutShown]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  // console.log({
  //   isLoggedIn: isLoggedIn,
  //   toastShown: toastShown,
  //   logoutShown: logoutShown,
  //   isLoggedOut: isLoggedOut,
  //   error: error,
  //   errorAuth: errorAuth,
  //   message: message,
  //   isRegistered: isRegistered,
  // });



  return (
    <div className={styles.cont}>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className={isLoggedIn ? styles.content : clsx(styles.content, styles.notLoggedIn)}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>

  );
}

export default SharedLayout;
