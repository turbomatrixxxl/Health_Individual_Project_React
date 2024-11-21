import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

import styles from './RegisterPage.module.css'

export default function RegisterPage() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Register</h2>
            <RegisterForm />
        </section>
    )
}
