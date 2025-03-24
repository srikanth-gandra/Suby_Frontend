import React from "react";
import LandingPage from "./suby/pages/LandingPage";
import './App.css'
import { Routes, Route } from "react-router-dom";
import ProductsMenu from "./suby/components/ProductsMenu";

const App = () => {
  return(
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products/:firmId/:firmName" element={<ProductsMenu />} />
        </Routes>
      </div>
  )
}

export default App;