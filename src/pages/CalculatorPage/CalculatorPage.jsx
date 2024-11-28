import React, { useEffect } from 'react'
import { useMediaQuery } from "react-responsive";

import { useLocation } from "react-router-dom";
import Calculator from '../../components/Calculator/Calculator';
import { useDispatch } from 'react-redux';

import { fetchPrivateCalculationData, fetchConsumedProductsForSpecificDay } from '../../redux/private/operationsPrivate'

import Logo from '../../components/Logo/Logo';
import NavLinks from '../../components/NavLinks/NavLinks';

import LoginStatistics from '../../components/LoginStatistics/LoginStatistics';
import { usePrivate } from '../../hooks/usePrivate';

import styles from './CalculatorPage.module.css'

const breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width:768px)",
    desktop: "(min-width:1024px)",
};

export default function CalculatorPage() {
    useLocation();

    const isDesktop = useMediaQuery({ query: breakpoints.desktop });

    const { privateDispatch } = usePrivate();
    const dispatch = useDispatch();

    const today = getFormattedDate()

    useEffect(() => {
        const today = getFormattedDate(); // Ensure the correct format YYYY-MM-DD
        // console.log("Fetching data for date:", today);

        dispatch(fetchConsumedProductsForSpecificDay({ date: today })); // Pass as an object
    }, [dispatch]);

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
        const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
    }

    const handleClick = () => {
        dispatch(fetchConsumedProductsForSpecificDay({ date: today })); // Pass as an object
        // dispatch(refreshUser())
    }


    // console.log(getFormattedDate());

    // Function to handle form submission
    const handleSubmit = (formData) => {
        dispatch(fetchPrivateCalculationData(formData));
    };

    function formatToDisplayDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
    }

    function handleProductsForSelectedDate(date) {
        setTimeout(() => {
            privateDispatch(fetchConsumedProductsForSpecificDay({ date: date }));
        }, 1000); // Delay of 500ms
    };

    return (
        <section className={styles.section}>
            <div className={styles.calculatorCont}>
                {isDesktop && (<div className={styles.leftCont}>
                    <Logo />
                    <NavLinks />
                </div>)}
                <Calculator handleClick={() => {
                    handleClick();
                    handleSubmit();
                    handleProductsForSelectedDate(today)
                }} onSubmit={handleSubmit} />
            </div>
            <LoginStatistics day={formatToDisplayDate(today)} />
        </section>
    )
}
