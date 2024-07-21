const asyncHandler = require("express-async-handler");
const Recipes = require("../models/recipesModel");

//@desc geting recipe based on given selection
//@route POST /api/recipeGenerate
//@acess private 
const recipePrompt = asyncHandler(async (req, res) => {
    console.log("The request body is: ",req.body);

    const {cuisine,diet,ingredients} = req.body;
    if((!cuisine)||(!diet)||(!ingredients)){
        res.status(400);
        throw new Error("Enter All the information!");
    };

    //@desc function to generate a recipe based on the given prompts

    const query = {$and:[{cuisine:"Indian"},{diet:/vegetarian/i},{$and:ingredients.map(ingredient=>({ingredients:{$regex:new RegExp(ingredient,"i")}}))}]};
    const possibleRecipes = await Recipes.find(query);
    let recipe;

    if(possibleRecipes.length == 0)
    {
        res.status(400);
        throw new Error("No recipes found");
    }

    else if(possibleRecipes.length == 1)
    {
        recipe = possibleRecipes[0]; 
    }

    else
    {
        const index = Math.floor(Math.random() * possibleRecipes.length);
        recipe = possibleRecipes[index];
    }

    res.status(201).json({recipe});
});

module.exports = recipePrompt;