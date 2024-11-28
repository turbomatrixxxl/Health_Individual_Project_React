import React from 'react'
import PropTypes from "prop-types";

import { useMediaQuery } from "react-responsive";
import UserLogout from '../UserLogout/UserLogout';
import { useAuth } from '../../hooks/useAuth';
import { usePrivate } from '../../hooks/usePrivate';

import styles from './LoginStatistics.module.css'

const breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width:768px)",
    desktop: "(min-width:1024px)",
};

function LoginStatistics({ day }) {
    const isDesktop = useMediaQuery({ query: breakpoints.desktop });
    const { user } = useAuth()
    const { dailyCalorieSummary } = usePrivate()

    // Validate the format dd-mm-yyyy
    const isValidDate = /^\d{2}.\d{2}.\d{4}$/.test(day);
    if (!isValidDate) {
        console.error(`Invalid date format: ${day}. Expected dd.mm.yyyy.`);
    }

    return (
        <div className={styles.resultsCont}>
            {isDesktop && <UserLogout />}
            <div className={styles.statisticSuperCont}>
                <div className={styles.statisticCont}>
                    <p className={styles.resultsToday}>Summary for {day}</p>
                    <ul className={styles.statisticList}>
                        <li key="left" className={styles.statisticListItem}>
                            <span className={styles.statisticListItemSpan}>
                                Left
                            </span>
                            <span className={styles.statisticListItemSpan}>
                                {dailyCalorieSummary?.remainingCalories !== 0 ? dailyCalorieSummary.remainingCalories : '000'} kcal
                            </span>
                        </li>
                        <li key="consumed" className={styles.statisticListItem}>
                            <span className={styles.statisticListItemSpan}>
                                Consumed
                            </span>
                            <span className={styles.statisticListItemSpan}>
                                {dailyCalorieSummary?.totalCaloriesConsumed > 0 ? dailyCalorieSummary.totalCaloriesConsumed : '000'} kcal
                            </span>
                        </li>
                        <li key="daily" className={styles.statisticListItem}>
                            <span className={styles.statisticListItemSpan}>
                                Daily rate
                            </span>
                            <span className={styles.statisticListItemSpan}>
                                {dailyCalorieSummary?.dailyCalorieIntake > 0 ? dailyCalorieSummary.dailyCalorieIntake : '000'} kcal
                            </span>                    </li>
                        <li key="normal" className={styles.statisticListItem}>
                            <span className={styles.statisticListItemSpan}>
                                n% of normal
                            </span>
                            <span className={styles.statisticListItemSpan}>
                                {dailyCalorieSummary?.percentageCaloriesConsumed > 0 ? dailyCalorieSummary.percentageCaloriesConsumed : '0'} %
                            </span>                    </li>
                    </ul>
                </div>
                <div className={styles.notRecommendedCont}>
                    <p className={styles.notRecommendedTitle}>
                        Food not recommended
                    </p>
                    {user?.dietaryInfo?.restrictedAliments?.length > 0 ? (
                        <ul className={styles.notRecommendedList}>
                            {user.dietaryInfo.restrictedAliments.map((aliment) => (
                                <li key={aliment?._id} className={styles.notRecommendedListItem}>
                                    {aliment.title}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notRecommendedEmpty}>
                            Your diet will be displayed here
                        </p>
                    )}
                </div>
            </div>
        </div>)
}

LoginStatistics.propTypes = {
    day: PropTypes.string.isRequired,
};

export default LoginStatistics;