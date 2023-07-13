import  React, {useEffect, useState} from 'react';
// import CardMedia from '@mui/material/CardMedia';
import axios from "axios";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import { Button } from '@mui/material';

const Comment = ({fileName}) => {
const [comment, setComment] = useState("");
const [comments, setComments] = useState("");

const popError = (errorMessage) => {

  toast.error(errorMessage, {
    className :"error-toast",
    position:toast.POSITION.BOTTOM_RIGHT
  });
}
    useEffect(() => {
        if(!localStorage.getItem("authToken")){
        } 
        const getAllComments = async() => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
        try {
              const { data } = await axios.get(`/api/comment/getAllComments/${fileName}`, config);
                setComments(data.res);
            
            } 
            catch (error) {
              popError(error.response.data.error);
            }
          };
          
          getAllComments();
        },[]);

        const addComment = async(e) => {
          e.preventDefault();
          if(comment === "")return;

          const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
          try {

                 
                const {data } = await axios.post(
                  "/api/comment/addComment",
                  {comment, username:localStorage.getItem("username"), fileName},
                  config
                );   
              
                toast.success("Comment added", {
                  className :"success-toast",
                  position:toast.POSITION.BOTTOM_RIGHT
                });

                setComments((preComment) => ( [...preComment, {comment, username:localStorage.getItem("username")}]));
            } catch (error) {
              popError(error.response.data.error);
            };

            setComment("");
      }

    return (
   <div className='comment-div'>
    <ToastContainer></ToastContainer>
    <h2 style={{fontWeight:"200px"}}>Comments</h2>
    <div className='comments'>
      {comments && comments.map(({_id, username,comment}) => (
        (username === localStorage.getItem("username"))?
        <div key={_id} className='owner-comment-wrapper'>
      <div className='owner-comment'>
           <span className='user-name'>{username}</span>
           <span className='user-comment'>{comment}</span>
        </div>

      </div>
      :
      <div key={_id} className='comment-wrapper'>
      <div className='friend-comment'>
           <span className='user-name'>{username}</span>
           <span className='user-comment'>{comment}</span>
        </div>

      </div>

      ))}
      

    </div>
    <div className='send-comment'>
        <input name='comment' value={comment} onChange={(e) =>setComment(e.target.value)} ></input>
        <button onClick={(e) => addComment(e)}> Send</button>
    </div>
   </div>
     );
}
 
export default Comment;