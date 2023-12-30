import React, { useState } from "react"
import PostForm from "../components/PostForm"
import { PostList } from "../components/PostList"
import { MyButton } from "../components/UI/button/MyButton"
import MyModal from "../components/UI/mymodal/MyModal"
import axios from '../api/axios'
import { useEffect, useMemo } from "react"
import { getPosts } from "../server/postController"
import '../styles/Posts.css'

const Posts = () => {

  const [posts, setPosts] = useState([])
  const [success, setSuccess] = useState(false)
  const [postError, setPostError] = useState(null);

  // const [title, setTitle] = useState('')
  // const [body, setBody] = useState('')

  const handleFetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/authR/posts');
      setPosts(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    handleFetchPosts();
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setSuccess(true)

  }

  const [modal, setModal] = useState(false)

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const formattedDate = useMemo(() => {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среду', 'Четверг', 'Пятницу', 'Субботу'];
    const currentDate = new Date();
    return `${daysOfWeek[currentDate.getDay()]}, (${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()})`;
  }, []);

  return (
    <div className="Posts">
      <MyModal visible={modal} setVisible={setModal}>
        <div className="titleBlock">
          <h2 className="modelTitle">Создание поста</h2>
        </div>
        <>
          {postError ? (
            <div className="errorBlock">
              <h3>{postError?.response?.data?.message}</h3>
              <MyButton onClick={() => { setModal(false); setPostError(null); setSuccess(false) }}>Окей</MyButton>
            </div>
          ) : success ? (
            <div className="successBlock">
              <h3>Запись успешно создана!</h3>
              <MyButton onClick={() => { setModal(false); setSuccess(false) }}>Закрыть</MyButton>
            </div>
          ) : (
            <PostForm create={createPost} onError={setPostError} />
          )}
        </>

      </MyModal>
      {posts.length === 0 ? (<div className="loadingBlock"><h2 className="loading">Загрузка записей...<br />Это займет некоторое время</h2></div>) : (
        <PostList remove={removePost} posts={posts} title={`Список записей на ${formattedDate}`} handleFetchPosts={handleFetchPosts} />
      )}

      <MyButton style={{ display: 'block', margin: '1% auto' }} onClick={() => setModal(true)}>Создать запись</MyButton>

    </div>
  );

}

export default Posts;