import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


import styles from "./HomePage.module.css";


export default function HomePage() {
    const location = useLocation();

    // Redirect to CalculatorPage if `/home` is accessed
    if (location.pathname === "/home") {
        return <Navigate to="/home/calculator" />;
    }

    return (
        <section className={styles.section}>
            HomePage
            <Outlet />
        </section>
    )
}
