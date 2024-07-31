import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Welcome from "./Welcome"
import Login from "./Login"
import Register from "./Register"
import SavedRecipes from "./SavedRecipes"
import FindRecipe from "./FindRecipe";
import RecipeDetails from "./RecipeDetails";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/SavedRecipes" element={<SavedRecipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/FindRecipe" element={<FindRecipe />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
