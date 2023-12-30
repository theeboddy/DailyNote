import React, { useEffect, useState } from "react";
import book from '../../../icons/book.png';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import useAuth from "../../../context/useAuth";
import './Navbar.css'

const Navbar = () => {

    const { auth, setAuth } = useAuth()

    const handleLogout = () => {
        setAuth(null);
    }

    console.log(auth)

    useEffect(() => {
        console.log("Auth context updated in Navbar:", auth);
        
    }, [auth]);

    return (
        <>
            {auth ? (
                <div className="navbar">
                    <div className="navbar_items">
                        <img src={book} className='nav_icon' />
                        <Link className="navLink" to="/posts">Записи</Link>
                        <Link className="navLink" onClick={handleLogout} to="/registration">Выйти</Link>
                        <Link className="navLink" to="/about">О сайте</Link>
                        <div className="userInfo">
                            <img className="imgProf" src={auth?.avatar} alt="" />
                            <Link to='/profile' className="navLink">{auth?.name}</Link>
                        </div>
                    </div>
                </div>
            ) : (<div className="navbar">
                <div className="navbar_items">
                    <img src={book} className='nav_icon' />
                    <Link className="navLink" to="/registration">Регистрация</Link>
                    <Link className="navLink" to="/about">О сайте</Link>

                </div>
            </div>)}
        </>

    );
}

export default Navbar;