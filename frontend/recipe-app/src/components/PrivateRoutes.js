//Private Routes

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const PrivateRoutes = () => {
    const sessionToken = localStorage.getItem('token');

    const isValidToken = (token) => {
        if(!token){
            return false;
        }

        try{
            const decode = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if(decode.exp < currentTime){
                console.log("token expired");
                return false;
            }

            return true;
        }catch(error){
            console.log('Invalid token:', error);
            return false;
        }
    }

    if(!(isValidToken(sessionToken))){
        localStorage.removeItem('token');
        return <Navigate to="/login" replace={true} />;
    }
    
    return <Outlet />;
};

export default PrivateRoutes;