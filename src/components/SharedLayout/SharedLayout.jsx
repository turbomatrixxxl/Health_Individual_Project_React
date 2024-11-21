import React from "react";
// import { useMediaQuery } from "react-responsive";

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import { useAuth } from "../../hooks/useAuth";
// import Loader from "../commonComponents/Loader";

import styles from './SharedLayout.module.css';

// const Background = lazy(() => import("../Background/Background"));

function SharedLayout() {
  // const { isLoggedIn } = useAuth();

  // Check for tablet or larger screens
  // const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className={styles.cont}>
      <div className={styles.content}>
        {/* <Suspense fallback={<Loader />}>
          {isLargeScreen && !isLoggedIn && <Background />}
        </Suspense>
        <div className={styles.svg}></div> */}

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
