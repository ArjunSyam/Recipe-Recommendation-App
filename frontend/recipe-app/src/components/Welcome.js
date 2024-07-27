//base html for the Welcome page
import { Link } from 'react-router-dom';
import React, { useEffect } from "react";
import './css/Welcome.css'

const Welcome = () =>{
    return (
        <div className="container mt-3" id = "Welcome-body">
            <div className="row">
                <div className="col text-end">
                    <div className="login/Signup">
                        <Link to="/login" className="btn">Login/Signup</Link>
                    </div>
                </div>
            </div>

            <br></br>

            <div className="row mt-5 text-center" id = "Title-text">
                    <h1 className='title'>
                        <strong>W</strong>elcome to Taste of India
                    </h1>
            </div>
        </div>
        
    );
}

export default Welcome;