import { useState } from "react";
import { useSelector } from "react-redux";
import {postComment} from "../api/index"

const CommentForm = (props) => {
  const [text, setText] = useState()
  var User = useSelector((state) => (state.currentUserReducer))
  
 

const onSubmit = (e)=>{

  if(User === null) {
    alert("u are not loged in")
  }
  const body = {
    userId:User?.result._id,
    email:User?.result.email,
    text:text,
    qid:window.location.pathname.split("/")[2],
    name:User.result.name
    
  }
  postComment(body).then(el=>{
    alert("comment hase been posted")
  })
  console.log(body);
}


  return (
    <div >
   
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={onSubmit} className="comment-form-button" >
        Post comment
      </button>
      {/* {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )} */}
    </div>
  );
};

export default CommentForm;
