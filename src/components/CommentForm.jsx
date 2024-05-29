import { useState, useContext } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

CommentForm.propTypes = {
  postID: PropTypes.string,
  addComment: PropTypes.func,
};

export default function CommentForm({ postID, addComment }) {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const authUser = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    postComment("https://blog-api-ryanwong.fly.dev/comments", {
      text: commentText,
      postID: postID,
    }).then((response) => {
      handleCommentPostResponse(response);
    });
  }

  async function postComment(
    url = "https://blog-api-ryanwong.fly.dev/comments",
    data,
  ) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  function handleCommentPostResponse(response) {
    if (response.info && response.info.message) {
      setError(response.info.message);
    } else {
      console.log(response);
      const newComment = {
        ...response.comment,
        author: { username: authUser.auth.username },
      };
      addComment(newComment);
      setCommentText("");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Add comment</label>
          <textarea
            maxLength={500}
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              if (error) {
                setError(null);
              }
            }}
            className="w-full px-3 py-2 border rounded-lg"
            rows={5}
            cols={50}
            required
          />
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
}
