import React from "react";
import { useRef, useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import { Link, useHistory, useNavigate } from 'react-router-dom'
import axios from "../../../api/axios";
import useAuth from "../../../context/useAuth";
import './Login.css'
import { MyButton } from "../button/MyButton";
import MyModal from "../mymodal/MyModal";

const LOGIN_URL = '/auth';

const Login = () => {
    const { auth, setAuth, isAuthenticated } = useAuth();
    const userRef = useRef()
    const errRef = useRef()
    const [err, setErr] = useState(false)

    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setErrMsg('')
    }, [username, pwd])

    useEffect(() => {
        console.log("Auth context in Login:", auth);
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        

        try {
            const response = await axios.post('http://localhost:5000/authR/auth', { username, pwd })
            const accessToken = response?.data?.token;
            const role = response?.data?.role;
            const avatar = response?.data?.image;
            const name = response?.data?.username;

            setAuth({ name, pwd, role, avatar, accessToken });
            console.log("помещенные данные в auth:", { auth })

            setUsername('')
            setPwd('')
            setSuccess(true)

        } catch (err) {
            if (!err?.response) {
                setErrMsg('Ответ от сервера не получен');
            } else if (err.response?.status === 400) {
                console.log(err.response.data.message)
                setErrMsg(err.response?.data?.message);
            } else if (err.response?.status === 401) {
                setErrMsg(err.response?.data?.message);
            } else {
                setErrMsg('Login Failed');
            }
            setErr(true)
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
                    {err ? (
                        <MyModal visible={err} setVisible={setErr}>
                            <div className="titleBlock">
                                <h2 className="modelTitle">Ошибка</h2>
                            </div>
                            <div className="aboutErr">
                                <p ref={errRef}>{errMsg}</p>
                                <div className="okeyBtnBlock">
                                    <MyButton style={{ width: '70%' }} onClick={() => setErr(false)}>Окей</MyButton>
                                </div>
                            </div>
                        </MyModal>
                    ) : (<></>)}

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

                            <Link className="linkToPage" to="/registration">Зарегистрироваться</Link>
                        </span>
                    </p>
                </div>
            )}

        </>
    )
}
export default Login;