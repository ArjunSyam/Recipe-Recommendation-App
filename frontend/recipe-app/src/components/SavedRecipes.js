import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Welcome = () =>{
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () =>{
            setIsLoading(true);
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5001/api/recipes',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if(response.error){
                    console.error('Failed to fetch user data');
                } else{
                    console.log(response.data);
                    setSavedRecipes(response.data);
                }
                
            }catch(error){
                console.error('Error fetching user data:', error);
            } finally{
                setIsLoading(false);
            }
        };
        fetchRecipes();
    },[]);

    return (
        <div className="container mt-3">
            <div className='row mt-5 text-center justify-content-center'>
                <h1>Your Saved Recipes</h1>
            </div>
            {isLoading ? (
                <div className="spinner-border text-primary text-center justify-content-center" role="status" />
            ) : savedRecipes.length > 0 ? (
                savedRecipes.map((recipe,index)=> (
                    <div key={index} className="row mt-3 text-center justify-content-center">
                        <div className="col-md-6 col-sm-12">
                            <img src={recipe.image_url} alt={recipe.name} className="img-fluid" />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <h3>{recipe.name}</h3>
                        </div>

                    </div>
                ))
            ) : (
                <div className="row mt-3 text-center justify-content-center">
                    <h1>
                        No saved recipes
                    </h1>
                </div>
            ) }
    
        </div>
        
    );
}

export default Welcome;