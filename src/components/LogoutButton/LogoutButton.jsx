import React from "react";
import PropTypes from "prop-types";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./LogoutButon.module.css";

function LogoutButton({ handleLogoutModal }) {
  return (
    <button
      className={styles.logoutContainer}
      onClick={handleLogoutModal}
      aria-label="Log out"
      title="Log out"
    >
      <FontAwesomeIcon icon={faRightFromBracket} className={styles.icon} />
      <span className={styles.exit}>Exit</span>
    </button>
  );
}

LogoutButton.propTypes = {
  handleLogoutModal: PropTypes.func,
};

export default LogoutButton;
