import React from "react";
import './Comment.css'
import useAuth from "../../../context/useAuth";

const MyComment = (props) => {
    console.log("Get in MyComment", props.comment)
    const { auth } = useAuth();



    // console.log(auth);

    return (
        <div className="comment">
            <div className="imgUserBlock">
            <img src={props.comment.image} alt="фото пользователя" />
            </div>
            <div className="commentContent">
                <h4 className="userNameBlock">
                    {`${props.comment.username} - ${props.comment.role || 'Guest'}`}
                </h4>
                <p>{props.comment.body}</p>
            </div>
        </div>
    )
}
 
export default MyComment;