//base html for the Welcome page
import { Link } from 'react-router-dom';
import React from "react";

const Welcome = () =>{
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col text-end">
                    <div className="login/Signup">
                        <Link to="/login" className="btn">Login/Signup</Link>
                    </div>
                </div>
            </div>

            <br></br>

            <div className="row mt-5 text-center">
                    <h1>
                        WELCOME TO OUR RECIPE APP
                    </h1>
            </div>
        </div>
        
    );
}

export default Welcome;