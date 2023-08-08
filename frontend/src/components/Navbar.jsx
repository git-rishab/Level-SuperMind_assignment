import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../styles/navbar.module.css";

export default function Navbar() {
    const redirect = useNavigate();
    const token = sessionStorage.getItem('token');
    const logout = ()=>{
        sessionStorage.clear();
        redirect("/")
    }
  return (
    <nav className={styles.nav}>
        <div>
            Blog
        </div>
        <div>
            <div onClick={()=>redirect("/")}>Home</div>
            {
                token ? (<div className={styles.div}>
                    <div>Dashboard</div>
                    <div onClick={logout} className={styles.logout}>Logout</div>
                </div>) : (
                    <div onClick={()=>redirect("/login")}>Login/Register</div>
                )
            }            
        </div>
    </nav>
  )
}
