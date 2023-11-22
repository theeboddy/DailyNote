import React from "react";
import MyComment from "./UI/comment/MyComment";
import '../styles/CommentList.css'

const CommentList = ({ comments }) => {
  console.log('комментарии полученные в CommentList:', comments);

 
  if (!Array.isArray(comments.comments)) {
    return <p className="loadingCommentP">Загрузка комментариев...</p>;
  }

  const commentsArray = comments.comments;

  return (
    <div>
      <h2 className="titleCommentList">Комментарии</h2>
      {commentsArray.length === 0 ? (
       
        <p className="loadingCommentP">У этой записи ещё нет комментариев.</p>
      ) : (
        
        commentsArray.map((comment, index) => (
          <MyComment key={index} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentList;
