import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import { Outlet, Navigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Calculator from "../../components/Calculator/Calculator";
import { fetchCalculationData } from "../../redux/public/operationsPublic";
import Modal from "../../components/commonComponents/Modal/Modal";

import useToggle from "../../hooks/useToggle";
import Logo from "../../components/Logo/Logo";
import AuthLinks from "../../components/AuthLinks/AuthLinks";
import { usePublic } from "../../hooks/usePublic";

import Button from "../../components/commonComponents/Button";
import { HiX } from "react-icons/hi";

import Loader from '../../components/commonComponents/Loader'

import { resetForm } from '../../redux/public/publicCalculatorSlice'

import styles from "./HomePage.module.css";

const breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width:768px)",
};

export default function HomePage() {
    const [isCalculatorModalVisible, toggleIsCalculatorModalVisible] = useToggle(false);
    const modalRef = useRef();

    const { result } = usePublic()
    // console.log(result?.recommendedDailyCaloriesIntake);


    const location = useLocation();
    const dispatch = useDispatch();

    const isMobile = useMediaQuery({ query: breakpoints.mobile });
    // const isTablet = useMediaQuery({ query: breakpoints.tablet });

    useEffect(() => {
        if (isCalculatorModalVisible) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") toggleIsCalculatorModalVisible();
        };

        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.body.classList.remove(styles.noScroll);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isCalculatorModalVisible, toggleIsCalculatorModalVisible]);

    const closeOnClickOutside = (event) => {
        if (event.target !== event.currentTarget) {
            toggleIsCalculatorModalVisible();
        }
    };

    // Function to handle form submission
    const handleSubmit = (formData) => {
        dispatch(fetchCalculationData(formData));
    };

    // Redirect to CalculatorPage if `/home` is accessed
    if (location.pathname === "/home") {
        return <Navigate to="/home/calculator" />;
    }

    function handleOpenModal() {
        toggleIsCalculatorModalVisible()
    }

    return (
        <section className={styles.section}>
            {isCalculatorModalVisible && (
                <div
                    ref={modalRef}
                    className={styles.modalOverlay}
                    onClick={closeOnClickOutside}
                >
                    <div className={styles.modalContent}>
                        <Modal
                            closeButton={styles.closeButton}
                            handleModalClose={toggleIsCalculatorModalVisible}
                            isModalVisible={isCalculatorModalVisible}
                        >
                            {isMobile && (
                                <div className={styles.mobileHeaderCont}>
                                    <header className={styles.modalHeader}>
                                        <Logo className={styles.logoHeaderContainer} />
                                        <AuthLinks />
                                    </header>
                                    <div className={styles.mobileSubHeaderCont}>
                                        <button onClick={toggleIsCalculatorModalVisible} className={styles.mobileHeaderExitButton}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                <path d="M14 1.5V4.5H2M2 4.5L5.5 1M2 4.5L5.5 8" stroke="black" strokeWidth="2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className={styles.modalLogoutActionCenter}>
                                <button
                                    className={styles.closeModal}
                                    id="closeModal"
                                    onClick={toggleIsCalculatorModalVisible}
                                >
                                    <HiX size="16px" />
                                </button>
                                {!result && isMobile && <Loader />}
                                {result ? (
                                    <>
                                        <h2>Your recommended daily calorie intake is</h2>
                                        <p className={styles.calories}>
                                            {result?.recommendedDailyCaloriesIntake || "N/A"}
                                            <span>kcal</span>
                                        </p>
                                        <div className={styles.line}></div>
                                        <p className={styles.notEat}>Foods you should not eat</p>
                                        <ol className={styles.list}>
                                            {result?.data?.length > 0 ? (
                                                result.data.map(item => (
                                                    <li key={item._id}>{item.title}</li>
                                                ))
                                            ) : (
                                                <p>No foods listed</p>
                                            )}
                                        </ol>
                                        <Link className={styles.link} to="/login">
                                            <Button
                                                handleClick={() => {
                                                    toggleIsCalculatorModalVisible();
                                                    dispatch(resetForm)
                                                }}
                                                type="button"
                                                variant="colored"
                                            >
                                                Start losing weight
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <p>Loading your recommendations...</p>
                                )}
                            </div>
                        </Modal>
                    </div>
                </div>
            )}            {/* Pass handleSubmit as the onSubmit prop */}
            <Calculator handleClick={handleOpenModal} onSubmit={handleSubmit} />
            <Outlet />
        </section>
    );
}
