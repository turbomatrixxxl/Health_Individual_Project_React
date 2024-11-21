import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

import styles from './LoginPage.module.css'

export default function LoginPage() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Log In</h2>
            <LoginForm />
        </section>
    )
}
