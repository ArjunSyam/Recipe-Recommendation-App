import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './css/SavedRecipes.css';    
import {Helmet} from 'react-helmet';

const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [usercred, setUsercred] = useState('');
    const navigate = useNavigate();

    const fetchRecipes = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://recipe-api-9ocv.onrender.com/api/recipes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.error) {
                console.error('Failed to fetch user data');
            } else {
                console.log(response.data);
                setSavedRecipes(response.data);
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () =>{
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get('https://recipe-api-9ocv.onrender.com/api/users/current',{
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

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleDelete = (id) => {
            const DeleteRecipe = async () => {
                try{
                    console.log(id);
                    const token = localStorage.getItem('token');
                    const response = await axios.delete(`https://recipe-api-9ocv.onrender.com/api/recipes/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
    
                    if(response.data.error){
                        console.log(response.data.error);
                    }
    
                    else
                    {
                        console.log("sucessfully deleted");
                        fetchRecipes();
                    }
    
    
                }catch(error){
                    console.error(error);
                }
            }
    
            DeleteRecipe();
    };

    const handleShowMore = (id) => {
        window.open(`/recipe/${id}`, '_blank');
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="container mt-3" id = "Welcome-body">
                <div className="home">
                    <div className="top-right-button">
                        <button className="btn" onClick={logout}>Logout</button>
                    </div>

                    <div className='top-left-button'>
                        <Link to="/FindRecipe" className="btn">Find Recipe</Link>
                    </div>

                    <div className="welcome-container">
                        <h1 className="Home-text">
                            Welcome {usercred.username},
                        </h1>
                        <h2 className="Home-subtext">
                            See Your Saved Recipes Down Below
                        </h2>

                        <br></br>

                        <a href="#saved">
                        <button className='btn-saved'>SAVED RECIPES</button>
                        </a>
                    </div>
                </div>

            </div>

            
            <div className='saved-recipes'id="saved">
            <div className='heading-container'>
                <h1>Your Saved Recipes</h1>
            </div>
            {isLoading ? (
                <div className="spinner-border" role="status" />
            ) : savedRecipes.length > 0 ? (
                savedRecipes.map((recipe, index) => (
                    <div key={index} className="recipe-container">
                        <img src={recipe.image_url} alt={recipe.name} className="recipe-image" />
                        <div className="recipe-details">
                            <h3>{recipe.name}</h3>
                            <div className="button-container">
                                <button onClick={() => handleDelete(recipe.recipe_id)} className="icon-button delete-button">
                                    Delete
                                </button>
                                <button onClick={() => handleShowMore(recipe._id)} className="icon-button show-more-button">
                                    <FontAwesomeIcon icon={faInfoCircle} /> Show More
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="no-recipes-message">No saved recipes</h1>
            )}
            </div>
        </div>
    );
}

export default SavedRecipes;