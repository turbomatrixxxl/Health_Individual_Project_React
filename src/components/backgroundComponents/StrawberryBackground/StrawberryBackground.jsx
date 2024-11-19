import React from 'react'
import clsx from 'clsx'
import PropTypes from "prop-types";


import styles from './StrawberryBackground.module.css'

export default function StrawberryBackground(className) {
    return (
        <div className={clsx(styles.cont, className)}></div>
    )
}

StrawberryBackground.propTypes = {
    className: PropTypes.string,
};