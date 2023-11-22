import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PostItem } from "./Postitem";
import axios from '../api/axios'
import '../styles/PostList.css'


export const PostList = ({ posts, title, remove, handleFetchPosts }) => {

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/authR/posts/${postId}`);
            remove(postId);
            handleFetchPosts();  
        } catch (e) {
            console.log(e);
        }
    }

    return (
        
            <div>
            <h1 style={{textAlign: 'center', margin: '2% auto'}}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) => 
                <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames="post"
                >
                <PostItem remove={() => handleDelete(post.id)} number={index + 1} post={post} handleFetchPosts={handleFetchPosts}/>
                </CSSTransition>
                )}
            </TransitionGroup>

        </div>
        
    
    )
}