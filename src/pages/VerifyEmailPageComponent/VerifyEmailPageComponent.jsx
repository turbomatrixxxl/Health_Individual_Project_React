import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resendVerificationEmail } from "../../redux/auth/operationsAuth"; // API for resending verification email
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to navigate to the login page
import Button from "../../components/commonComponents/Button";

import styles from "./VerifyEmailPageComponent.module.css";

const VerifyEmailPage = () => {
    const { user, errorAuth } = useAuth(); // To handle errors from Redux
    const dispatch = useDispatch();

    const handleResendVerificationEmail = () => {
        dispatch(resendVerificationEmail(user.email)); // API call to resend email
    };

    useEffect(() => {
        if (errorAuth) {
            console.error("Error:", errorAuth); // Log error if any
        }
    }, [errorAuth]);

    const getEmailProviderUrl = (email) => {
        const domain = email.split("@")[1];

        // Handle popular email providers
        switch (domain) {
            case 'gmail.com':
                return `https://mail.google.com/mail/u/0/#inbox`;
            case 'yahoo.com':
                return `https://mail.yahoo.com`;
            case 'outlook.com':
            case 'hotmail.com':
                return `https://outlook.live.com/mail/0/inbox`;
            case 'icloud.com':
                return `https://www.icloud.com/mail`;
            default:
                return `https://mail.${domain}`; // Fallback to default if the provider is not listed
        }
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Please verify your email address</h2>
            <p className={styles.message}>
                We sent a verification link to your email: <strong className={styles.strong}>{user.email}</strong>
            </p>
            <a className={styles.link} href={getEmailProviderUrl(user.email)} target="_blank" rel="noopener noreferrer">
                Go to your email provider
            </a>
            <Button className={styles.button} onClick={handleResendVerificationEmail} type="button" variant="colored">
                Resend Verification Email
            </Button>

            {errorAuth && <p className={styles.error}>{errorAuth}</p>}

            {/* Add text and link to the Login page */}
            <div className={styles.infoCont}>
                <p className={styles.infoText}>
                    If you've already verified your email, you can go to the
                </p>
                <Link to="/login" className={styles.link}>Login page</Link>
                <p className={styles.infoText}>to sign in.</p>
            </div>
        </section>
    );
};

export default VerifyEmailPage;
