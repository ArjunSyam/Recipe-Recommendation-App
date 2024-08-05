const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: './.env' });

connectDb();
const app = express();

const allowedOrigins = [
  'https://recipe-app-1djy.onrender.com',
  'http://localhost:3000' 
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use("/api/recipes", require("./routes/savedRoutes"));
app.use("/api/recipeGenerate", require("./routes/recipeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});