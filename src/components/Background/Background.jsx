import React from "react";
import PropTypes from "prop-types";
import styles from "./Background.module.css";

const Background = ({ variant = "original" }) => {
    const isRotated = variant === "rotated";

    return (
        <div className={styles.background}>
            <div className={isRotated ? styles.leavesRotated : styles.leavesOriginal}></div>
            <div className={styles.strawberry}></div>
            <div className={styles.banana}></div>
            <div className={styles.svg}></div>
        </div>
    );
};

Background.propTypes = {
    variant: PropTypes.oneOf(["original", "rotated"]),
};

export default Background;
