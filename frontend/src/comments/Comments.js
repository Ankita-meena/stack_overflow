import { useState, useEffect } from "react";
import {getComment} from "../api/index"
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import CommentMain from "./CommentMain"
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

const Comments = ({ commentsUrl, currentUserId }) => {
const qid = window.location.pathname.split("/")[2]
const [data, setData] = useState()
console.log(qid);

useEffect(() => {
  
  getComment(qid).then((el)=>{
    setData(el.data.data.commentData)
    console.log(el)

  }).catch((el)=>{
    console.log(el)
  })
}, [qid])

  // const [backendComments, setBackendComments] = useState([]);
  // const [activeComment, setActiveComment] = useState(null);
  // const rootComments = backendComments.filter(
  //   (backendComment) => backendComment.parentId === null
  // );
  // const getReplies = (commentId) =>
  //   backendComments
  //     .filter((backendComment) => backendComment.parentId === commentId)
  //     .sort(
  //       (a, b) =>
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //     );
  // const addComment = (text, parentId) => {
  //   createCommentApi(text, parentId).then((comment) => {
  //     setBackendComments([comment, ...backendComments]);
  //     setActiveComment(null);
  //   });
  // };

  // const updateComment = (text, commentId) => {
  //   updateCommentApi(text).then(() => {
  //     const updatedBackendComments = backendComments.map((backendComment) => {
  //       if (backendComment.id === commentId) {
  //         return { ...backendComment, body: text };
  //       }
  //       return backendComment;
  //     });
  //     setBackendComments(updatedBackendComments);
  //     setActiveComment(null);
  //   });
  // };
  // const deleteComment = (commentId) => {
  //   if (window.confirm("Are you sure you want to remove comment?")) {
  //     deleteCommentApi().then(() => {
  //       const updatedBackendComments = backendComments.filter(
  //         (backendComment) => backendComment.id !== commentId
  //       );
  //       setBackendComments(updatedBackendComments);
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getCommentsApi().then((data) => {
  //     setBackendComments(data);
  //   });
  // }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" 
      // handleSubmit={addComment}
       />
      <div className="comments-container">
        {console.log("Cdata",data)}
        {data?.map((el) => (
          <CommentMain
            key={el._id}
            data={el}
            // comment={rootComment}
            // replies={getReplies(rootComment.id)}
            // activeComment={activeComment}
            // setActiveComment={setActiveComment}
            // addComment={addComment}
            // deleteComment={deleteComment}
            // updateComment={updateComment}
            // currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
