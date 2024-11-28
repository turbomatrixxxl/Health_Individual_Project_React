import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; // Import Link
import { logOut } from "../../redux/auth/operationsAuth";
import { useAuth } from "../../hooks/useAuth";

import Modal from "../commonComponents/Modal/Modal";
import useToggle from "../../hooks/useToggle";

import styles from "./UserLogout.module.css";
import LogoutButton from "../LogoutButton/LogoutButton";
import Logo from "../Logo/Logo";
import Button from "../commonComponents/Button";

const breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width:768px)",
};

export default function UserLogout() {
    const { isLoggedIn, user } = useAuth();
    const [isLogoutModalVisible, toggleIsLogoutModalVisible] = useToggle(false);
    const modalRef = useRef();
    // console.log(user);


    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOut());
    };

    useEffect(() => {
        if (isLogoutModalVisible) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") toggleIsLogoutModalVisible();
        };

        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.body.classList.remove(styles.noScroll);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isLogoutModalVisible, toggleIsLogoutModalVisible]);

    const closeOnClickOutside = (event) => {
        if (event.target !== event.currentTarget) {
            toggleIsLogoutModalVisible();
        }
    };

    const isMobile = useMediaQuery({ query: breakpoints.mobile });
    const isTablet = useMediaQuery({ query: breakpoints.tablet });

    if (!isLoggedIn) { return null };

    return (
        <>
            <div className={styles.cont}>
                <p>{user ? user.username ?? user.name : "User"}</p>
                <span>|</span>
                <LogoutButton handleLogoutModal={toggleIsLogoutModalVisible} />
            </div>

            {isLogoutModalVisible && (
                <div
                    ref={modalRef}
                    className={styles.modalOverlay}
                    onClick={closeOnClickOutside}
                >
                    <div className={styles.modalContent}>
                        <Modal
                            closeButton={styles.closeButton}
                            handleModalClose={toggleIsLogoutModalVisible}
                            isModalVisible={isLogoutModalVisible}
                        >
                            {isMobile && (
                                <header className={styles.modalHeader}>
                                    <Logo className={styles.logoHeaderContainer} />
                                    <div className={styles.userContainer}>
                                        <p>{user ? user.username ?? user.name : "User"}</p>
                                        <span>|</span>
                                        <LogoutButton handleLogoutModal={toggleIsLogoutModalVisible} />
                                    </div>
                                </header>
                            )}
                            <div className={styles.modalLogoutActionCenter}>
                                {isTablet && (
                                    <div className={styles.logo}>
                                        <h1>Health</h1>
                                        <Logo className={styles.logoHeaderContainer} />
                                    </div>
                                )}
                                <p className={styles.question}>
                                    Are you sure you want to log out?
                                </p>
                                <div className={styles.modalButtonsContainer}>
                                    {/* Link to "/" on Logout */}
                                    <Link className={styles.link} to="/">
                                        <Button
                                            handleClick={() => {
                                                toggleIsLogoutModalVisible();
                                                handleLogout();
                                            }}
                                            type="button"
                                            variant="colored"
                                        >
                                            Logout
                                        </Button>
                                    </Link>
                                    <Button
                                        handleClick={toggleIsLogoutModalVisible}
                                        type="button"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            )}
        </>
    );
}
