import React, { useRef, useState, useEffect } from "react";
import { MyButton } from "../button/MyButton";
import './Register.css'
import { Link, useHistory } from 'react-router-dom'
import axios from "../../../api/axios";
import MyModal from "../mymodal/MyModal";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [err, setErr] = useState(false);

    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [role, setRole] = useState('User')

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd, matchPwd])

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    const setImage = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const src = e.target.result;
                setImageSrc(src);
            };
            reader.readAsDataURL(selectedFile);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log("Отправляем запрос с данными: ", { username, pwd, matchPwd, role, imageSrc });
            const response = await axios.post('http://localhost:5000/authR/registration', { username, pwd, role, imageSrc });
            console.log("Получен ответ от сервера: ", response.data);
            setSuccess(true)
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('Ответ от сервера не получен, повторите попытку')
            }
            else if (err.response?.status === 409) {
                setErrMsg(err.response?.data?.message);

            } else if (err.response?.status === 400) {
                setErrMsg(err.response?.data?.message)
            }
            else {
                setErrMsg('Ресурс не найден, повторите попытку позже')
            }
            setErr(true)

        }
    }

    return (
        <>
            {success ? (
                <div className='register'>
                    <h1>Регистрация пройдена успешно!</h1>
                    <p className="linkSignIn">
                        <Link to='/auth'>Войти</Link>
                    </p>
                </div>
            ) : (
                <div className='register'>

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
                    <h2>Регистрация</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <label htmlFor="username">
                                Имя пользователя:
                            </label>
                            <input
                                type='text'
                                id="username"
                                ref={userRef}
                                autoComplete='off'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)} />
                            <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                                от 4 до 24 символов.<br />
                                Должно начинаться с буквы.<br />
                                Допускаются буквы, цифры, подчеркивания, дефисы.
                            </p>
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="username">
                                Фото пользователя:
                            </label>
                            <input
                                className="imageInput"
                                type='file'
                                accept='image/*'
                                placeholder='Выберите фото дня'
                                onChange={setImage}
                                style={{ padding: '1%' }}
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="password">
                                Пароль:
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                от 8 до 24 символов.<br />
                                Должен содержать заглавные и строчные буквы, цифру и специальный символ.<br />
                                Разрешенные специальные символы: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>

                            </p>
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="confirm_pwd">
                                Подтвердите пароль:
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                Должно совпадать с первым полем ввода пароля.
                            </p>
                        </div>
                        <div className="btnContainer">
                            <MyButton
                                className="btnContainer button"
                            >Зарегистрироваться</MyButton>
                        </div>
                    </form>
                    <p className="qustion">
                        Уже есть аккаунт?<br />
                        <span className="line">
                            <Link className="linkToPage" to='/auth'>Войти</Link>
                        </span>
                    </p>
                </div>
            )}
        </>
    );
}

export default Register;