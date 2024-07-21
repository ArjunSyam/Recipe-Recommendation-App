import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home(){
    const [usercred, setUsercred] = useState('');

    useEffect(() => {
        const fetchUser = async () =>{
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5001/api/users/current',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if(response.error){
                    console.error('Failed to fetch user data');
                } else{
                    console.log(response.data);
                    setUsercred(response.data);
                }
                
            }catch(error){
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    },[]);

    

    return (
        <div className="home">
            <div className = "row mt-5">
                <div className = "col-md-6 text-md-start">
                    <Link to="/SavedRecipes" className="text-primary">Saved Recipes</Link>
                </div>

                <div className = "col-md-6 text-md-end">
                    <Link to="/login" className="text-primary">{usercred.username}</Link>
                </div>
            </div>

            <div className = "row mt-2 justify-content-center">
                <h1 className = "text-center">
                    Welcome {usercred.username} what would you like
                    to do today
                </h1>
            </div>

        </div>

    );
};

export default Home;