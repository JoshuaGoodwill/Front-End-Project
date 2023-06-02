import { useEffect, useState } from "react";
import { fetchComments } from "../api";
import NewComment from "./NewComment";

const CommentsList = ({ id }) => {
  const [commentsArr, setCommentsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentError, setCommentError] = useState([]);

  useEffect(() => {
    fetchComments(id)
      .then(({ comments }) => {
        return comments;
      })
      .then((comments) => {
        setCommentsArr(comments);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="loadingMessage">Loading Comments...</p>;
  } else {
    return (
      <div id="comments">
        <h2 id="commentsTitle">Comments</h2>
        <NewComment
          id={id}
          setCommentsArr={setCommentsArr}
          setCommentError={setCommentError}
        ></NewComment>
        <ul id="commentsList">
          {commentError.map((error) => {
            return (
              <li className="commentsListItem">
                <h4>{error.errorTitle}</h4>
                <p className="commentText">{error.errorMessage}</p>
              </li>
            );
          })}
          {commentsArr.map((comment) => {
            const fullDate = new Date(comment.created_at);
            return (
              <li className="commentsListItem" key={comment.comment_id}>
                <h4 className="commentTitle">
                  {comment.author} commented on {fullDate.getDate()}/
                  {fullDate.getMonth()}/{fullDate.getFullYear()}:
                </h4>
                <p className="commentText">{comment.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default CommentsList;
