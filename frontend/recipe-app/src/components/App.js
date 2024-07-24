import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Welcome from "./Welcome"
import Login from "./Login"
import Register from "./Register"
import Home from "./Home"
import SavedRecipes from "./SavedRecipes"
import FindRecipe from "./FindRecipe";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/SavedRecipes" element={<SavedRecipes />} />
          <Route path="/FindRecipe" element={<FindRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
