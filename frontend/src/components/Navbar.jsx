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
        <div onClick={()=>redirect("/")}>
            Blog
        </div>
        <div style={{display:"flex"}}>
            <div onClick={()=>redirect("/")} style={{marginRight:"30px"}}>Home</div>
            {
                token ? (<div className={styles.div}>
                    <div style={{marginRight:"20px"}} onClick={()=>redirect("/dashboard")}>Dashboard</div>
                    <div onClick={logout} className={styles.logout}>Logout</div>
                </div>) : (
                    <div onClick={()=>redirect("/login")}>Login/Register</div>
                )
            }
        </div>
    </nav>
  )
}
