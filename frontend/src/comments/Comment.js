import { useState } from "react";
import CommentForm from "./CommentForm";


const Comment = ({
  data
  
}) => {
  const [canEdit, setCanEdit] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  

  return (
    <>
    <div 
    
    className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{data.name}</div>
          
        </div>
         <div className="comment-text">{data.text}</div>
        {/* {isEditing && (
          <CommentForm
          
          />
        )} */}
        {/* <div className="comment-actions"> */}
          
          {/* {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )} */}
          {/* {canEdit && (
            <div
              className="comment-action"
              // onClick={() =>
              //   setActiveComment({ id: comment.id, type: "editing" })
              // }
            >
              Edit
            </div>
          )} */}
          {/* {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )} */}
        </div>
        {/* {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )} */}
        {/* {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )} */}
      {/* </div> */}
    
    </div>
    <h1>hello</h1>
    </>

  );
};

export default Comment;
