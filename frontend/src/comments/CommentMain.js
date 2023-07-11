import { useState } from "react";
import CommentEdit from "./CommentEdit"
import {deleteComment} from "../api/index"

const Comment = (props) => {
    const {data} = props
    const [canEdit, setCanEdit] = useState(true)
    const [canDelete, setCanDelete] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

const handeldelete = ()=>{
  deleteComment(data._id).then(el=>{
    alert("comment is deleted")
  })
}

  return (
    <div 
    // key={comment.id} 
    className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{data.name}</div>
          {/* <div>{createdAt}</div> */}
        </div>
         <div className="comment-text">{data.text}</div>
          {isEditing && (
          <CommentEdit id={data._id} data={data} />
        )}
         <div className="comment-actions">
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setIsEditing(true)
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={handeldelete}
            >
              Delete
            </div>
          )}
         </div>

       
      </div>
    </div>
  );
};

export default Comment;
