import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/RecipeDetails.css';

function RecipeDetails(){
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            setIsLoading(true);
            try{
                const pathParts = window.location.pathname.split('/')
                const id = pathParts[pathParts.length - 1];
                console.log("hello",id);
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5001/api/recipes/${id}`,
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
                    setRecipe(response.data);
                    console.log("recipe: ",response.data);
                }


            }catch(error){
                console.error(error);
            }finally{
                setIsLoading(false);
            }
        }

        fetchRecipe();
    },[]);

    return(
        <div>
        {isLoading ? (
            <div className="spinner-border" role="status" />
        ) : recipe && Object.keys(recipe).length > 0 ? (
            <div className='recipe'>
                <img src={recipe.image_url} alt={recipe.name} className="recipe-img" />
                <div className="body">
                    <h2 className="Name-title">{recipe.name}</h2>
                    <br />
                    <h4 className="Diet-title">Diet: {recipe.diet}</h4>
                    <br />
                    <h4 className="Prep-title">Prep Time: {recipe.prep_time}</h4>
                    <br />
                    <h4 className="Desc-title">Description:</h4>
                    <p className='body-text'>{recipe.description}</p>
                    <br />
                    <h4 className="Ingredients-title">Ingredients:</h4>
                    <p className='card-text'>{recipe.ingredients}</p>
                    <br />
                    <h4 className="Instructions-title">Instructions:</h4>
                    <p className='body-text'>{recipe.instructions}</p>
                    <br />
                </div>
            </div>
        ) : (
            <h1 className="no-recipes-message">No recipe found</h1>
        )}
        </div>
    );
};

export default RecipeDetails;