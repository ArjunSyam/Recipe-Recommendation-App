const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: './.env' });

connectDb();
const app = express();

app.use(cors({
    origin: "https://recipe-app-1djy.onrender.com",
    credentials: true
}))

app.use(express.json());
app.use("/api/recipes", require("./routes/savedRoutes"));
app.use("/api/recipeGenerate", require("./routes/recipeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });