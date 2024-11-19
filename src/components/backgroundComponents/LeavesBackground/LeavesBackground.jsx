import React from 'react'
import clsx from 'clsx'
import PropTypes from "prop-types";



import styles from './LeavesBackground.module.css'

export default function LeavesBackground({ variant, className }) {
    return (
        <div className={clsx(variant === "secondary" ? styles.secondary : variant === "ternary" ? styles.ternary : styles.cont, className)}></div>
    )
}

LeavesBackground.propTypes = {
    variant: PropTypes.string,
    className: PropTypes.string,
};
