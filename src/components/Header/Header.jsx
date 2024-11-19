import React from "react";

import LogoutButton from "../LogoutButton/LogoutButton";
import Logo from "../Logo/Logo";
import AuthLinks from "../AuthLinks/AuthLinks";

import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";

import styles from "./Header.module.css";

function Header({ handleLogoutModal }) {
  const { isLoggedIn, user } = useAuth();

  return (
    <header className={clsx(styles.header)}>
      <Logo className={styles.logoContainer} />
      {!isLoggedIn && <AuthLinks />}
      {isLoggedIn && (
        <div className={styles.userContainer}>
          <p> {user.username}</p>
          <span>|</span>
          <LogoutButton handleLogoutModal={handleLogoutModal} />
        </div>
      )}
    </header>
  );
}

export default Header;
