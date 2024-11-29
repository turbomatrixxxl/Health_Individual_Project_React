import React, { useEffect } from 'react'
import { useMediaQuery } from "react-responsive";

import { useLocation, useNavigate } from "react-router-dom";
import Calculator from '../../components/Calculator/Calculator';
import { useDispatch } from 'react-redux';

import { fetchPrivateCalculationData, fetchConsumedProductsForSpecificDay } from '../../redux/private/operationsPrivate'

import Logo from '../../components/Logo/Logo';
import NavLinks from '../../components/NavLinks/NavLinks';

import LoginStatistics from '../../components/LoginStatistics/LoginStatistics';
import { usePrivate } from '../../hooks/usePrivate';

import { logOut } from '../../redux/auth/operationsAuth';
import { useAuth } from '../../hooks/useAuth';

import styles from './CalculatorPage.module.css'

const breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width:768px)",
    desktop: "(min-width:1024px)",
};

export default function CalculatorPage() {
    useLocation();

    const { isLoggedIn } = useAuth()
    const { error, privateDispatch } = usePrivate()

    const isDesktop = useMediaQuery({ query: breakpoints.desktop });

    const thisDispatch = useDispatch()
    const navigate = useNavigate();

    const today = getFormattedDate()

    useEffect(() => {
        const today = getFormattedDate(); // Ensure the correct format YYYY-MM-DD
        // console.log("Fetching data for date:", today);

        privateDispatch(fetchConsumedProductsForSpecificDay({ date: today })); // Pass as an object
    }, [privateDispatch]);

    useEffect(() => {
        if (error === "Not authorized") {
            const timeout = setTimeout(() => {
                thisDispatch(logOut());
                navigate("/login");
            }, 5000);

            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [error, isLoggedIn, thisDispatch, navigate]);


    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
        const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
    }

    const handleClick = () => {
        privateDispatch(fetchConsumedProductsForSpecificDay({ date: today })); // Pass as an object
        // dispatch(refreshUser())
    }


    // console.log(getFormattedDate());

    // Function to handle form submission
    const handleSubmit = (formData) => {
        privateDispatch(fetchPrivateCalculationData(formData));
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
            {(error || !isLoggedIn) && <div className={styles.errorMessage}>{(error === 'Not authorized') ? <div className={styles.errorMessage}>
                <p>
                    For reasons of personal data security Your authorisation has expired ! We will shortly redirect You to your login page. If you want to continue Please Login again ! Thank You for understanding !
                </p>
            </div> : error}
            </div>}

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
