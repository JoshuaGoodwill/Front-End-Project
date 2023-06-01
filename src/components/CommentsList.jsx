import { useEffect, useState } from "react";
import { fetchComments } from "../utils";

const CommentsList = ({ id }) => {
  const [commentsArr, setCommentsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <ul id="commentsList">
          {commentsArr.map((comment) => {
            const fullDate = new Date(comment.created_at);

            return (
              <li className="commentsListItem" key={comment.comment_id}>
                <h4>
                  {comment.author} commented on {fullDate.getDate()}/
                  {fullDate.getMonth()}/{fullDate.getFullYear()}:
                </h4>
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default CommentsList;
