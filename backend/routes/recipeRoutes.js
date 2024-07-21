const express = require("express");
const router = express.Router();
const recipePrompt = require("../controllers/recipeController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").post(recipePrompt);

module.exports = router;