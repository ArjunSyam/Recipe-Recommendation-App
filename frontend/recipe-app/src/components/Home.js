import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Home.css'

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
                <div className = "col-md-5 text-center" id="Saved-recipes">
                    <Link to="/SavedRecipes" className="text-primary">Saved Recipes</Link>
                </div>

                <div className = "col-md-6" id>
                    <Link to="/" className="text-primary">logout</Link>
                </div>
            </div>

            <div className = "row mt-2 justify-content-center">
                <h1 className = "Home-text">
                    <strong className="first-word">W</strong>elcome {usercred.username} what would you like
                    to do today
                </h1>
            </div>

            <div className='row mt-2 justify-content-center'>
                <div className='col-md-4 text-center'>
                    <Link to="/FindRecipe" className="btn btn-primary">Find Recipe</Link>
                </div>
            </div>

        </div>

    );
};

export default Home;