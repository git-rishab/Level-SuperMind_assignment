import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
    const navigate = useNavigate();
    

    return (
        <div style={{width:"100%"}}>
            <Navbar />
            
        </div>
    )
}
