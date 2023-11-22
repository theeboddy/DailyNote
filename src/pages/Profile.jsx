import React from "react";
import '../styles/Profile.css'
import useAuth from "../context/useAuth";

const Profile = () => {

    const {auth, setAuth} = useAuth()

    return (
        <div className="profileBlock">
            <div className="imgBlock">
                <h3>Фото:</h3>
                <img className="imgProfile" src={auth.avatar} alt="фото пользователя" />
            </div>
            <div className="infoProfile">
                <h3>Имя:<br/> {auth.name}</h3>
                <h3>Роль:<br/> {auth.role}</h3>
            </div>
        </div>
    );
}
 
export default Profile;