import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import './css/FindRecipe.css'

function FindRecipe(){
    let [selectedRecipes, setSelectedRecipes] = useState([]);
    let [randomRecipe, setRandomRecipe] = useState({});
    const [selectedCuisine, setSelectedCuisine] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let [index, setindex] = useState(-1);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const cuisines = useMemo(() => [
    'Andhra', 'Asian', 'Assamese', 'Awadhi', 'Bengali Recipes', 'Bihari', 'Chettinad', 'Continental', 
    'Coorg', 'Coastal Karnataka', 'Fusion', 'Goan Recipes', 'Gujarati Recipes', 'Haryana', 'Himachal', 
    'Hyderabadi', 'Indian', 'Indo Chinese', 'Jharkhand', 'Karnataka', 'Kashmiri', 'Kerala Recipes', 
    'Kongunadu', 'Konkan', 'Lucknowi', 'Maharashtrian Recipes', 'Malabar', 'Malvani', 'Mangalorean', 
    'Middle Eastern', 'Mughlai', 'Nagaland', 'Nepalese', 'North East India Recipes', 'North Indian Recipes', 
    'North Karnataka', 'Oriya Recipes', 'Pakistani', 'Parsi Recipes', 'Punjabi', 'Rajasthani', 'Sindhi', 
    'South Indian Recipes', 'South Karnataka', 'Sri Lankan', 'Tamil Nadu', 'Udupi', 'Uttar Pradesh', 
    'Uttarakhand-North Kumaon'
    ],[]
    );

    const ingredients = useMemo(() => [
            'carrots', 'cabbage', 'onion', 'green chillies', 'turmeric powder', 'cumin powder',
            'mustard seeds', 'coconut', 'curry leaves', 'moong dal', 'red chilli', 'tamarind paste',
            'gooseberry', 'coconut oil', 'fish', 'tomato', 'kokum', 'lemon', 'dagad phool',
            'fennel seeds', 'cumin seeds', 'ginger', 'garlic paste', 'coriander powder', 'eggs',
            'potatoes', 'poppy seeds', 'cloves', 'garlic', 'green chilli', 'mustard oil', 'chilli',
            'bay leaf', 'sugar', 'jackfruit', 'urad dal', 'chana dal', 'cashew nuts',
            'sesame seeds', 'mango', 'jaggery', 'lotus stem', 'black cardamom', 'curd', 'kashmiri chilli',
            'fennel powder', 'dry ginger', 'mint powder', 'ajwain', 'coriander', 'cinnamon', 'garam masala',
            'spinach leaves', 'red chillies', 'green beans', 'carrot', 'green peas', 'potato',
            'mangalorean cucumber', 'milk', 'chicken', 'bay leaves', 'butter', 'wheat', 'ghee',
            'button mushrooms', 'black peppercorns', 'coriander seeds', 'onions', 'sprouts',
            'mutton', 'cinnamon stick', 'instant oats', 'bottle gourd', 'jaggery',
            'yellow moong dal', 'tamarind', 'star anise',
            'shallots', 'black pepper', 'tomato puree', 'mint', 'rice', 'tomatoes',
            'cream', 'paneer', 'kasuri methi', 'byadagi chillies', 'kashmiri chillies', 'methi seeds',
            'coconut milk', 'chayote', 'sesame oil', 'banana', 'elephant yam', 'olive oil', 'flour',
            'papaya', 'pearl onions', 'drumstick', 'brinjal', 'urad dal flour', 'banana stem',
            'amchur', 'wheat flour', 'tapioca root', 'groundnut powder', 'sesame powder',
            'sambar powder', 'shrimps', 'basmati rice', 'baby brinjals',
            'arhar dal', 'bell pepper', 'sesame', 'amaranth leaves', 'apple', 'yeast', 'kalonji',
            'green chawli', 'kala chana', 'mint leaves',
            'spinach', 'nutmeg powder', 'cardamom powder', 'cauliflower', 'almonds',
            'soya chaap', 'cheese', 'raisins', 'horse gram', 'foxtail millet', 'jowar seeds',
            'dry coconut', 'pink masoor dal', 'cucumber', 'green amaranth', 'turnips', 'rice flour',
            'soy granules', 'mace', 'crabs', 'kabuli chana', 'drumstick leaves', 
            'plantain stem', 'tindora', 'peanuts', 'shellfish',
            'rasam powder', 'toor dal', 'mangoes', 'seeraga samba rice', 'prawns',
            'sooji', 'masoor dal', 'spring onion', 'flax seed', 'rajma', 'saffron', 'avarekalu',
            'lilva beans', 'moong dal', 'capsicum',
            'bhindi', 'methi leaves', 'french beans', 'peas', 'anardana powder', 'rava',
            'phool makhana', 'karela', 'lady finger', 'walnuts', 'dates', 'black salt',
            'betel leaves', 'pistachios', 'paneer', 'makki flour', 'yellow mustard seeds',
            'bajra', 'semiya', 'beetroot', 'avocado', 'chenna', 'kokums',
            'purple cabbage', 'rock salt', 'apples', 'purple yam', 'tinda',
            'ridge gourd', 'buckwheat', 'bamboo shoots', 'ragi seeds', 'quinoa', 'brown rice',
            'gujiya', 'dill leaves', 'poha', 'sweet potato', 'broad beans', 'chironji', 'broccoli',
            'tender coconut', 'okra', 'yogurt', 'soybeans', 'horse gram', 'aam papad', 'black sesame seeds',
            'soy sauce', 'baby corn', 'red cabbage', 'barnyard millet', 'passion fruit',
            'chocolate chips', 'matta rice', 'lemongrass', 'tofu', 'iceberg lettuce', 'white wine',
             'amla', 'kaffir lime', 'pomegranate juice', 'sweet potatoes', 'flax seeds',
            'pumpkin leaves', 'bathua leaves', 'hog plum', 'sorrel leaves',
            'aloe vera', 'tapioca', 'badam', 'poha', 'dessicated coconut', 'rabodi', 'barley', 'corn kernels',
            'neem flowers', 'sugarcane vinegar', 'palm fruit', 'watermelon', 'moth sprouts',
            'figs', 'jalapenos', 'radish', 'peanut butter', 'gulkand', 'betel nut', 'white chocolate',
            'strawberries', 'palm sugar', 'pumpkin seeds', 'millet', 'moth dal',
            'dark chocolate', 'cocoa powder', 'hibiscus', 'sunflower seeds', 'chickpeas',
            'kodo millet', 'nylon sabakki', 'star fruit', 'cremini mushrooms', 'field beans',
            'dragon fruit', 'kesar', 'rusk', 'nigella seeds'
        ],[]
    );

    const ingredientOptions = useMemo(() =>
        ingredients.map(ingredient => ({value: ingredient, label: ingredient}))
    ,[ingredients]
    );

    const diets = useMemo(() => [
        "Vegetarian", "High Protein Vegetarian", "Non Vegetarian", 
        "Diabetic Friendly", "High Protein Non Vegetarian", 
        "Eggetarian", "No Onion No Garlic (Sattvic)", 
        "Gluten Free", "Vegan"
    ],[]
    );

    const handleSubmit = async (event) => {
        console.log(selectedCuisine,selectedIngredients,selectedDiet);
        event.preventDefault();
        setIsLoading(true);
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5001/api/recipeGenerate',
                { 
                    "cuisine": selectedCuisine,
                    "diet": selectedDiet,
                    "ingredients": selectedIngredients
                },
                {
                    headers: { 'Content-Type': 'application/json' ,Authorization: `Bearer ${token}`},
                    withCredentials: true
                }
            )

            if(response.data.error)
            {
                console.error('Failed to fetch user data');
            }
            else if(response.data.length == 0)
            {
                console.log('No recipes found');
                setAlertMessage("No Recipe found for given selection");
                setAlertSeverity("error");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
            else{
                console.log("hello: ",response.data);
                const recipes = response.data;
                selectedRecipes = recipes;
                setSelectedRecipes(recipes);
            }

        }catch(error){
            console.error('Error fetching user data:', error);
        }finally{
            setIsLoading(false);
        }

    }

    const SaveRecipe = async (event) => {
        console.log(selectedCuisine,selectedIngredients,selectedDiet);
        event.preventDefault();

        try{
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5001/api/recipes',
                {
                    "recipe_id" : randomRecipe.recipe_id
                },
                {
                    headers: { 'Content-Type': 'application/json' ,Authorization: `Bearer ${token}`},
                    withCredentials: true
                }
            )

            if(response.data.error)
            {
                console.error('Failed to fetch user data');
            }
            else if(randomRecipe != {})
            {
                setAlertMessage(`${randomRecipe.name} has been saved`);
                setAlertSeverity('success');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }

        }catch(error){
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        if (selectedRecipes.length > 0) {
            // Call recipeChoose only when randomRecipe is not an empty object
            recipeChooseForward();
        }
    }, [selectedRecipes]);

    const recipeChooseForward = () => {
        if(index >= selectedRecipes.length-1)
        {
            index = -1;
        }

        index+=1;
        setindex(index);

        const recipe = selectedRecipes[index];
        setRandomRecipe(recipe);
        randomRecipe = recipe;

        console.log(index);
        
    }

    const recipeChooseBackward = () => {
        if(index <= 0)
        {
            index = selectedRecipes.length;
        }
        index-=1;
        setindex(index);

        const recipe = selectedRecipes[index];
        setRandomRecipe(recipe);
        randomRecipe = recipe;

        console.log(index);
    
    }
                
    

    return (

        <div className='container mt-3'>
            {showAlert && (
                <Alert variant="filled" severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            )}
            <div className='row mt-2 text-center'>
            </div>
    
            <div className='row mt-3'>
                <div className='col-md-6' id="select-options">
                    <div className='form-container'>
                        <div className='input-box'>
                            <header>Find a Recipe</header>
                            <form id="SelectRecipeForm" onSubmit={handleSubmit}>
                                <div className="input-field">
                                    <select
                                        id="cusineSelect"
                                        className="input"
                                        value={selectedCuisine}
                                        onChange={(e) => setSelectedCuisine(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select a cuisine</option>
                                        {cuisines.map((cuisine, index) => (
                                            <option key={index} value={cuisine}>{cuisine}</option>
                                        ))}
                                    </select>
                                </div>
    
                                <div className="input-field">
                                    <Select
                                        isMulti
                                        id="ingredientSelect"
                                        required
                                        options={ingredientOptions}
                                        onChange={(selectedOptions) => 
                                            setSelectedIngredients(selectedOptions.map(option => option.value))
                                        }
                                        placeholder="Select ingredients"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                    />
                                </div>
    
                                <div className="input-field">
                                    <select
                                        id="dietSelect"
                                        className="input"
                                        value={selectedDiet}
                                        onChange={(e) => setSelectedDiet(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select a diet</option>
                                        {diets.map((diet, index) => (
                                            <option key={index} value={diet}>{diet}</option>
                                        ))}
                                    </select>
                                </div>
    
                                <div className="input-field">
                                    <button type="submit" className="submit">Find Recipe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
    
                <div className='col-md-6' id = "recipe-show">
                    {isLoading ? (
                        <div className="spinner-border text-primary text-center justify-content-center" role="status" />
                    ) : randomRecipe != {} ? (
                        <div className="recipe-set row">
                            <div className='col-1 d-flex align-items-center justify-content-center'>
                                <button className='next-button prev-button' onClick={recipeChooseBackward}>
                                    <img src="arrow-left.png" alt="Previous Recipe" className="backward" />
                                </button>
                            </div>
    
                            <div className='col-10'>
                                <div className='card'>
                                    <img src={randomRecipe.image_url} alt={randomRecipe.name} className="card-img-top" />
                                    <button className='save-button' onClick={SaveRecipe}>
                                        <img src="bookmark.png" alt="Save Recipe" className="save-icon" />
                                    </button>
    
                                    <div className="card-body">
                                        <h2 className="card-title">{randomRecipe.name}</h2>
                                        <br />
                                        <h4 className="card-title">{randomRecipe.prep_time}</h4>
                                        <br />
                                    </div>
                                </div>
                            </div>
    
                            <div className='col-1 d-flex align-items-center justify-content-center'>
                                <button className='next-button next-button-right' onClick={recipeChooseForward}>
                                    <img src="arrow-right.png" alt="Next Recipe" className="forward" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <h1>No recipes</h1>
                        </div>
                    )}        
                </div>
            </div>
        </div>
    );
};

export default FindRecipe;