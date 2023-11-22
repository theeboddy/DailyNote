import React from "react";
import { useRef, useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import {Link, useHistory, useNavigate} from 'react-router-dom'
import axios from "../../../api/axios";
import useAuth from "../../../context/useAuth";
import './Login.css'
import { MyButton } from "../button/MyButton";

const LOGIN_URL = '/auth';

const Login = () => {
    const { auth, setAuth, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    // const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, pwd])

    useEffect(() => {
        console.log("Auth context in Login:", auth);
      }, [auth]);

      useEffect(() => {
        if (success) {
            const timeoutId = setTimeout(() => {
                navigate("/posts");
            }, 5000);

            return () => clearTimeout(timeoutId); 
        }
    }, [success, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/authR/auth', {username, pwd})
            const accessToken = response?.data?.accessToken;
            const role = response?.data?.role;
            const avatar = response?.data?.image; 
            const name = response?.data?.username; 
            console.log({ username, pwd, role, accessToken, avatar })
            setAuth({ name, pwd, role, avatar, accessToken });
            
            setUsername('')
            setPwd('')
            setSuccess(true)

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        } 

    }

    return ( 
        <>
            {success ? (
                <div className='authBlock'>
                    <h1>Вы вошли в приложение!</h1>
                    <p className="goToPost">
                        <Link to="/posts">Написать запись</Link>
                    </p>
                </div>
            ) : (
            <div className="authBlock">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h2>Авторизация</h2>
                <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                        <label htmlFor="username">Имя пользователя:</label>
                        <input 
                            type="text" 
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                </div>
                <div className="inputContainer">
                        <label htmlFor="pwd">Пароль:</label>
                        <input 
                            type="password" 
                            id="pwd"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                        />
                </div>
                <div className="btnContainer">
                    <MyButton>Войти</MyButton>
                </div>
                </form>
                <p className="qustion">
                    У вас нет аккаунта?<br />
                    <span className="line">
                    {/*put router link here*/}
                        <Link className="linkToPage" to="/registration">Зарегистрироваться</Link>
                    </span>
                </p>
        </div>
    )}
    
    </>
)} 
export default Login;