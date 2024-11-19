import React from 'react'
import { useMediaQuery } from 'react-responsive'

import styles from './HeartSvgBackground.module.css'

const breakpoints = {
    desktop: '(min-width: 1024px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    mobile: '(max-width: 767px)',
};

export default function HeartSvgBackground() {
    const isDesktop = useMediaQuery({ query: breakpoints.desktop });
    const isTablet = useMediaQuery({ query: breakpoints.tablet });

    return (
        <div>
            {isTablet && <div className={styles.cont}>
                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="521" height="563" viewBox="0 0 521 563" fill="none">
                    <path d="M188.322 238.052C46.4931 249.816 4.6057 371.017 0.472073 430.147C-8.34633 595.956 108.559 712.469 169.032 750H553V0C553 0 526.82 22.5184 522.687 63.4191C488.699 240.809 490.077 267.463 428.532 276.195C366.987 284.927 289.367 229.67 188.322 238.052Z" fill="#F0F1F3" />
                </svg>
            </div>}
            {isDesktop && <div className={styles.cont}>
                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="603" height="816" viewBox="0 0 603 816" fill="none">
                    <path d="M206 259C51.6 271.8 6 403.667 1.5 468C-8.1 648.4 119.167 775.167 185 816H603V-0.000244141C603 -0.000244141 574.5 24.4998 570 68.9997C533 262 534.5 291 467.5 300.5C400.5 310 316 249.881 206 259Z" fill="#F0F1F3" />
                </svg>
            </div>}
        </div>
    )
}
