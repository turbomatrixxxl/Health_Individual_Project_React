import React from "react";
import { Link } from "react-router-dom";

import DesktopLogo from "./DesktopLogo/DesktopLogo";

import slimMomImage from "../../images/Slim Mom.jpg";

import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to={"/"} className={styles.container}>
      <DesktopLogo />
      <img className={styles.slimMom} src={slimMomImage} alt="Slim" />{" "}
    </Link>
  );
}
