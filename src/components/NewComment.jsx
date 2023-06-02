import { useEffect, useState } from "react";
import { fetchUsers, postComment } from "../api";

const NewComment = ({ id, setCommentsArr, setCommentError }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    commentBody: "",
  });

  const [usersArr, setUsersArr] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState({
    posted: -1,
    message: "",
  });
  const [formDisabler, setFormDisabler] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(({ users }) => {
        return users;
      })
      .then((users) => {
        setUsersArr(users);
        return users;
      })
      .then((users) => {
        setFormValues((currValue) => {
          return { ...currValue, username: users[0].username };
        });
      });
  }, []);

  const handleChange = (event) => {
    if (
      (event.target.id === "commentBody" && event.target.value.length >= 201) ||
      event.target.value.startsWith(" ") ||
      event.target.value.endsWith("  ")
    ) {
      return;
    } else {
      setFormValues((currValues) => {
        return { ...currValues, [event.target.id]: event.target.value };
      });
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    setFormDisabler(true);
    setCommentError([]);

    if (formValues.username !== "" && /^.{3,}$/i.test(formValues.commentBody)) {
      postComment(id, formValues.username, formValues.commentBody)
        .then(({ comment }) => {
          setCommentsArr((currComments) => {
            return [comment, ...currComments];
          });
          setFormValues((currValues) => {
            return { ...currValues, commentBody: "" };
          });
        })
        .then(() => {
          setFormDisabler(false);
          setFeedbackMessage({
            posted: 1,
            message: "Successfully posted comment.",
          });
        })
        .catch((err) => {
          console.log(err);
          setCommentError([
            {
              errorTitle: "ERROR",
              errorMessage:
                "ERROR POSTING COMMENT. PLEASE CHECK YOUR INTERNET CONNECTION OR REFRESH AND TRY AGAIN.",
            },
          ]);
          setFeedbackMessage({ posted: 0, message: "Error posting comment." });
          setFormDisabler(false);
        });
    } else {
      setFeedbackMessage({
        posted: 0,
        message: "Comment has to be 3 characters or longer.",
      });
      setFormDisabler(false);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <h3>Add Comment</h3>
      <label htmlFor="username">Username: </label>
      <select id="username" value={formValues.username} onChange={handleChange}>
        {usersArr.map((user) => {
          return (
            <option value={user.username} key={user.username}>
              {user.username}
            </option>
          );
        })}
      </select>
      <label htmlFor="commentBody">Comment: </label>
      <textarea
        id="commentBody"
        placeholder="Write comment here..."
        value={formValues.commentBody}
        onChange={handleChange}
      ></textarea>
      <button id="submitButton" disabled={formDisabler}>
        Submit Comment
      </button>
      <p className={`feedback${feedbackMessage.posted}`}>
        {feedbackMessage.message}
      </p>
    </form>
  );
};

export default NewComment;
