import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostForm from "./components/PostForm";
import { PostItem } from "./components/Postitem";
import { PostList } from "./components/PostList";
import { MyButton } from "./components/UI/button/MyButton";
import { MyInput } from "./components/UI/input/MyInput";
import About from "./pages/About";
import Posts from "./pages/Posts";
import './styles/App.css'
import book from './icons/book.png'
import Navbar from "./components/UI/navbar/Navbar";
import NotFound from "./pages/NotFound";
import AppRouter from "./components/AppRouter";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
