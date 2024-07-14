const express = require("express");
const router = express.Router();
const { 
    getRecipes,
    getRecipe,
    addRecipe,
    deleteRecipe,
} = require("../controllers/savedController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route('/').get(getRecipes).post(addRecipe);
router.route('/:id').get(getRecipe).delete(deleteRecipe);

module.exports = router;