import { useState } from "react";
import { useSelector } from "react-redux";
import {updateComment} from "../api/index"

const CommentForm = (props) => {
  const [text, setText] = useState()
  var User = useSelector((state) => (state.currentUserReducer))
  
 

const onSubmit = (e)=>{
    if(User === null) {
        alert("u are not loged in")
        return;
    }
    // if(User?.result.email !== props.data.email){
    //     alert("permission denied")
    //     return;
    // }
  const body = {
    text:text
  }
  updateComment(props.id,body).then(el=>{
    alert("comment hase been updated")
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
        Edit comment
      </button>
      
    </div>
  );
};

export default CommentForm;
