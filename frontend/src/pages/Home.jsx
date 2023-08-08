import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { url } from '../notification';
import styles from "../styles/home.module.css";
import Navbar from "../components/Navbar";

export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    
    useEffect(()=>{
        fetch(`${url}/blog/get`).then((raw)=>raw.json()).then((data)=>setData(data.blogs))
    },[])

    return (
        <div className={styles.body}>
            <Navbar/>
            <div className={styles.cont}>
                {
                    data?.map((el,i)=>(
                        <div key={i} className={styles.card}>
                            <h3>{el.title}</h3>
                            <p>{el.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
