import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Explore from './pages/Explore.js';
import Cart from './pages/Cart.js';
import ProductDetails from './pages/ProductDetails.js';
import CustomNavBar from './sharedComponents/NavBar.js';
import React, { useState } from 'react';
import { useAuthContext } from "./hooks/useAuthContext";
import Featured from "./pages/Featured.js";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
        <CustomNavBar />
        <div className='d-flex justify-content-center align-items-center'>
          <Routes> 
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            {user ? (
              <>
                <Route path="/signup" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Navigate to="/home" />} />
              </>
            ) : (
              <>
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </>
            )}

            <Route path="*" element={<Navigate to="/home" />} /> 
          </Routes>
        </div>
    </Router>
  );
}

export default App;
