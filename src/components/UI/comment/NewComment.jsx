import React from "react";
import './Comment.css'
import useAuth from "../../../context/useAuth";

const NewComment = (props) => {
    const { auth } = useAuth();

    console.log(auth);

    return (
        <div className="comment">
            <div className="imgUserBlock">
            <img src={auth ? auth.avatar : ''} alt="фото пользователя" />
            </div>
            <div className="commentContent">
                <h4 className="userNameBlock">
                    {auth ? `${auth.name} - ${auth.role}` : "Гость"}
                </h4>
                <p>{props.body}</p>
            </div>
        </div>
    )
}
 
export default NewComment;