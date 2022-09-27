import { useState, useEffect, useCallback, useContext } from "react";

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from "../../store/notification-context";

const Comments = (props) => {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [success, setSuccess] = useState('');
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    setIsFetchingComments(true);
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    setSuccess('');
    // send data to API
    const newCommentOBj = {
        eventId : eventId,
        ...commentData
    }

    notificationCtx.showNotification({
      title : 'Post comment',
      message : 'Comment is submiting',
      status : 'pending'
    })

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        if (data.status === 200) {
          setSuccess(data.message);
          notificationCtx.showNotification({
            title : 'Success',
            message : data.message || 'Comment posted!',
            status : 'status'
          })
        }
      }).catch(error => {
        notificationCtx.showNotification({
          title : 'Error',
          message : error.message || 'Something went wrong!',
          status : 'error'
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {success && <p>{success}</p>}
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments}  />}
      {showComments && isFetchingComments && <div>Loading...</div>}
    </section>
  );
}

export default Comments;