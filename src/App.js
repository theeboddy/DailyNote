import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
