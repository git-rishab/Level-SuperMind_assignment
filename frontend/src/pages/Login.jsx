import React from 'react'
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login";
import styles from "../styles/home.module.css";
import Navbar from "../components/Navbar";

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className={styles.loginCont}>
                <h1>Welcome to Blog Application</h1>
                <Login className={styles.login} />
            </div>
        </>
    )
}
