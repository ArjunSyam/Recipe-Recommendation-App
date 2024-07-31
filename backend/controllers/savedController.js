const asyncHandler = require("express-async-handler");
const Saved_Recipes = require("../models/savedModel");
const Recipes = require("../models/recipesModel");

//@desc Get all recipes
//@route GET /api/recipes
//@acess private 
const getRecipes = asyncHandler(async (req, res) => {
    const recipe_ids = await Saved_Recipes.find({user_id: req.user.id}).select('recipe_id');
    const recipes = await Promise.all(recipe_ids.map((id) => Recipes.findOne({recipe_id: id.recipe_id})));

    res.status(200).json(recipes);
});

//@desc Get recipe
//@route GET /api/recipes/:id
//@acess private 
const getRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipes.findById(req.params.id);
    console.log(recipe);

    if(!recipe){
        return res.status(400).json({ error: "Recipe not found !" });
    }

    res.status(200).json(recipe);
});

//@desc  add new Recipe
//@route POST /api/recipes
//@acess private 
const addRecipe = asyncHandler(async (req, res) => {
    console.log("The request body is: ",req.body);

    const {recipe_id} = req.body;
    if(!recipe_id){
        return res.status(400).json({ error: "No Recipe ID !" });
    };

    const check_recipe = await Recipes.findOne({recipe_id: recipe_id});
    if(!check_recipe){
        return res.status(400).json({ error: "Recipe not found!" });
    };

    let recipe = await Saved_Recipes.findOne({recipe_id: recipe_id});
    if(!recipe)
    {
        recipe = await Saved_Recipes.create({
            recipe_id,
            user_id: req.user.id
        });
    };

    res.status(201).json({recipe});
});

//@desc Delete Recipe
//@route DELETE /api/recipes/:id
//@acess private 
const deleteRecipe = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const recipe = await Saved_Recipes.findOne({recipe_id: req.params.id});
    console.log("hello");

    if(!recipe){
        res.status(404);
        throw new Error("Recipe not found");
    }

    if(recipe.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not authorized to delete this recipe");
    }

    await Saved_Recipes.deleteOne({recipe_id:req.params.id});

    res.status(201).json(recipe);
});

module.exports = { 
    getRecipes,
    getRecipe,
    addRecipe,
    deleteRecipe,
};