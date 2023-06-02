import { useState, useEffect, useRef } from "react";
import { patchVote } from "../utils";

const Vote = ({ id, votes }) => {
  const initialRenderTracker = useRef(true);
  const [voteValue, setVoteValue] = useState({
    vote: 0,
    amount: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const upvote = () => {
    switch (voteValue.vote) {
      case -1:
        setVoteValue({ vote: 1, amount: 2 });
        break;
      case 0:
        setVoteValue({ vote: 1, amount: 1 });
        break;
      case 1:
        setVoteValue({ vote: 0, amount: -1 });
        break;
    }
  };

  const downvote = () => {
    switch (voteValue.vote) {
      case -1:
        setVoteValue({ vote: 0, amount: 1 });
        break;
      case 0:
        setVoteValue({ vote: -1, amount: -1 });
        break;
      case 1:
        setVoteValue({ vote: -1, amount: -2 });
        break;
    }
  };

  useEffect(() => {
    if (initialRenderTracker.current) {
      initialRenderTracker.current = false;
    } else {
      patchVote(id, voteValue.amount)
        .then(() => {
          setErrorMessage("");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(
            "Problem with voting system. Please refresh the page."
          );
        });
    }
  }, [voteValue]);

  if (errorMessage !== "") {
    return (
      <div id="votingError">
        <p>Votes: {votes}</p>
        <p>{errorMessage}</p>
      </div>
    );
  } else {
    let upvoteText = "";
    let downvoteText = "";

    if (voteValue.vote === 0 || voteValue.vote === -1) {
      upvoteText = "Upvote";
    } else if (voteValue.vote === 1) {
      upvoteText = "Upvoted";
    }

    if (voteValue.vote === 0 || voteValue.vote === 1) {
      downvoteText = "Downvote";
    } else if (voteValue.vote === -1) {
      downvoteText = "Downvoted";
    }

    return (
      <div id="voting">
        <p>Votes: {votes + voteValue.vote}</p>
        <div id="buttonContainer">
          <button onClick={upvote} className={`upvoteButton${voteValue.vote}`}>
            {upvoteText}
          </button>
          <button
            onClick={downvote}
            className={`downvoteButton${voteValue.vote}`}
          >
            {downvoteText}
          </button>
        </div>
      </div>
    );
  }
};

export default Vote;
