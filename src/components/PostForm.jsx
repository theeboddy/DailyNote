import React, { useState, useRef } from "react";
import { MyInput } from "./UI/input/MyInput";
import { MyButton } from "./UI/button/MyButton";
import MyTextArea from "./UI/textarea/MyTextArea";
import axios from "../api/axios";
import useAuth from "../context/useAuth";



const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: '', image: null, author: ''}) 
    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef()
    const { auth } = useAuth()
    
    const setImage = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target.result;
            setPost({ ...post, image: imageSrc });
          };
          reader.readAsDataURL(selectedFile);
        }
      };

    const addNewPost = async (e) => {
        e.preventDefault()
        try {
          const newPost = {
            ...post, id: Date.now(), author: auth.name
        }
        create(newPost)
        console.log("Отправляем запрос с данными: ", post);
        const response = await axios.post('http://localhost:5000/authR/posts', newPost)
        console.log("необходимые данные", auth, newPost)
        
        setPost({title: '', body: '', image: null})
        console.log("Получен ответ от сервера: ", response.data);
        } catch(err) {
          if(!err?.response) {
              setErrMsg('No Server Response')
          }
          else if (err.response?.status === 409) {
              setErrMsg('Username Taken');
          } else {
              setErrMsg('Registration Failed')
          }
          errRef.current.focus();

      }
    }
    return ( 
        <form>
            <MyInput
                type='file'
                accept='image/*'
                placeholder='Выберите фото дня'
                onChange={setImage}
                style={{padding: '1%'}}
            />
            <MyInput 
                type='text' 
                placeholder="Название поста"
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
             />
            <MyTextArea type='text'
            placeholder="Содержание поста"
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Создать запись</MyButton>
      </form>
     );
}
 
export default PostForm;