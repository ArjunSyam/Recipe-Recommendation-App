const mongoose = require("mongoose");

const savedSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    recipe_id:{
        type: String,
        required: [true,"Please add recipe id"],
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Saved_Recipes",savedSchema);