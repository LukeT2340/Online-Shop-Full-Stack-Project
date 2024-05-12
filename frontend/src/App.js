import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import NavBar from './components/NavBar.js';
import React, { useState } from 'react';
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
        <NavBar />
        <Routes> 
          <Route path="/home" element={<Home />} />
          {user ? (
            <>
              <Route path="/signup" element={<Navigate to="/home" />} />
              <Route path="/login" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/home" />} /> 
        </Routes>
    </Router>
  );
}

export default App;
