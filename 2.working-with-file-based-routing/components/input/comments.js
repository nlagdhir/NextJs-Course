import { useState, useEffect } from "react";

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

const Comments = (props) => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [success, setSuccess] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
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

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setSuccess(data.message);
        }
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {success && <p>{success}</p>}
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}  />}
    </section>
  );
}

export default Comments;