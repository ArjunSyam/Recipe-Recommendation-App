import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Home.css';

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
            <div className="top-right-buttons">
                <Link to="/SavedRecipes" className="btn btn-outline-primary">Saved Recipes</Link>
                <Link to="/" className="btn btn-outline-danger">Logout</Link>
            </div>

            <div className="welcome-container">
                <h1 className="Home-text">
                    Welcome {usercred.username},
                </h1>
                <h2 className="Home-subtext">
                    See your Saved Recipes down Below
                </h2>
            </div>

            <div className="find-recipe-container">
                <Link to="/FindRecipe" className="btn btn-lg btn-primary find-recipe-btn">Find Recipe</Link>
            </div>
        </div>
    );
};

export default Home;