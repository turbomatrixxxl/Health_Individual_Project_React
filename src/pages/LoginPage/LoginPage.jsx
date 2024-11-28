import React, { useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from './LoginPage.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
    const { isLoggedIn, user } = useAuth();

    // Show a toast notification when login is successful
    useEffect(() => {
        if (isLoggedIn || user?.verify) {
            toast.success("Login successful!");
        }
    }, [isLoggedIn, user?.verify]); // Dependency array ensures the effect runs when these values change.

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Log In</h2>
            <LoginForm />
            <ToastContainer />
        </section>
    );
}
