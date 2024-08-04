const asyncHandler = require("express-async-handler");
const Recipes = require("../models/recipesModel");

//@desc geting recipe based on given selection
//@route POST /api/recipeGenerate
//@acess private 
const recipePrompt = asyncHandler(async (req, res) => {
    console.log("The request body is: ",req.body);
    let and_objects = []
    const {cuisine,diet,ingredients} = req.body;

    //@desc function to generate a recipe based on the given prompts

    if(cuisine != "")
    {
        and_objects.push({cuisine:cuisine})
    }

    if(diet != "")
    {
        and_objects.push({diet:diet})
    }

    if(ingredients.length != 0)
    {
        and_objects.push({$and:ingredients.map(ingredient=>({ingredients:{$regex:new RegExp(ingredient,"i")}}))})
    }

    const query = {$and:and_objects};
    console.log(query);
    let possibleRecipes;

    if(and_objects.length == 0)
    {
        console.log("random");
        possibleRecipes = await Recipes.aggregate([{ $sample: { size: 1 } }]);
    }
    else{
        possibleRecipes = await Recipes.find(query);
    }

    res.status(201).json(possibleRecipes);
});

module.exports = recipePrompt;