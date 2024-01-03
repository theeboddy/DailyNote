import React from "react";
import { Navigate, useHref, useNavigate } from "react-router-dom";
import { MyButton } from "./UI/button/MyButton";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { MyInput } from "./UI/input/MyInput";
import useAuth from "../context/useAuth";
import CommentList from "./CommentList";

export const PostItem = ({ remove, handleFetchPosts, ...props }) => {
    const router = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)
    const [comments, setComments] = useState([])
    const [bodyComment, setBodyComment] = useState('')
    const { auth } = useAuth()

    const handleOpenPostDetails = () => {
        const pathPosts = '/posts';
        const postId = props.post.id;
        console.log(postId)

        if (postId) {
            router(`${pathPosts}/${postId}`, { state: { postId } });
        } else {
            console.error('Post ID is null or undefined.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/authR/posts/${props.post.id}`)
            props.remove(props.post);
            handleFetchPosts()
        } catch (e) {
            console.log(e)
        }
    }

    const handleAddComment = async () => {
        try {
            const { avatar, name, role } = auth;
            const newComment = { body: bodyComment, image: avatar, username: name, role: role };

            setComments(prevComments => Array.isArray(prevComments) ? [...prevComments, newComment] : [newComment]);
            // setComments(() => [...comments, newComment])
            setBodyComment('');
            console.log(comments)

            await axios.post(`http://localhost:5000/authR/posts/${props.post.id}/comments`, newComment);
            fetchComments();
        } catch (e) {
            console.log(e);

        }
    }
    const fetchComments = async () => {
        try {

            const response = await axios.get(
                `http://localhost:5000/authR/posts/${props.post.id}/comments`
            );
            console.log('Comments response:', response.data);
            setComments(response.data);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (isExpanded) {
            fetchComments();
        }
    }, [isExpanded, props.post.id]);

    useEffect(() => {
        console.log(auth, props.post)
    }, [auth])

    return (
        <div className="post" >
            <div className="postFirstSide">
                <div className="post_info">
                    <div className="img_block">
                        <img alt="фото" src={props.post.image} />
                        <h5>Автор: {props.post.username}</h5>
                    </div>
                    <div className="post_content" >
                        <div className="title_container">
                            <h3>{props.number}.</h3>
                            <h3>{props.post.title}</h3>
                        </div>
                        <div className="postBody">{props.post.body}</div>
                    </div>

                </div>
                <div className="post_btn">
                    <MyButton onClick={handleOpenPostDetails}>Открыть</MyButton>
                    {auth.name === props.post.username ? (<MyButton onClick={handleDelete}>Удалить</MyButton>)
                        : (<></>)}

                    <MyButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? "Скрыть" : "Комментарии"}
                    </MyButton>
                </div>

            </div>
            <div className={isExpanded ? "postSecondSide" : "hidden"}>

                <CommentList comments={comments} />
                <div>
                    <MyInput
                        placeholder="Ваш комментарий"
                        value={bodyComment}
                        onChange={e => setBodyComment(e.target.value)}
                    />
                    <MyButton onClick={handleAddComment}>Добавить</MyButton>
                    {/* <MyButton onClick={fetchComments}>Получить комментарии</MyButton> */}
                </div>
            </div>
        </div>
    )
}