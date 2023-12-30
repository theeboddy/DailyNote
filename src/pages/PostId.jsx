import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import CommentList from "../components/CommentList";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import '../styles/PostId.css'
import { MyButton } from "../components/UI/button/MyButton";

const PostId = () => {
  const router = useNavigate()
  const { state } = useLocation();
  const postId = state && state.postId ? state.postId : null;

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем данные поста
        const postResponse = await axios.get(`http://localhost:5000/authR/posts/${postId}`);
        setPost(postResponse.data);
        console.log(postResponse.data)


        // Получаем комментарии к посту
        const commentsResponse = await axios.get(`http://localhost:5000/authR/posts/${postId}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchData();
  }, [postId]);

  const post2 = post.post

  return (
    <>{!post2 ? (<div className="loadingBlock"><h2 className="loading">Загрузка записи...<br />Это займет некоторое время</h2></div>) : (
      <div className="postDetails">
        <img className="imgPostId" src={post2.image} />

        <h2 className="titlePostId">{post2.title}</h2>
        <hr />
        <p className="bodyPostId">{post2.body}</p>
        <hr />
        <h5 className="authorPostId">Автор записи: {post2.username}</h5>

        <CommentList comments={comments} />
        <MyButton onClick={() => router(`/posts`)}>Назад</MyButton>
      </div>
    )}</>

  );
}

export default PostId;