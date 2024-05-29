import PropTypes from "prop-types";
import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { format } from "date-fns";
import CommentForm from "./CommentForm";

Comments.propTypes = {
  comments: PropTypes.array,
  post: PropTypes.object,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default function Comments({
  comments,
  post,
  addComment,
  deleteComment,
}) {
  const authUser = useContext(AuthContext);
  const [flashMessage, setFlashMessage] = useState(null);

  async function handleDelete(commentID) {
    try {
      const response = await deleteCommentFromDB(
        `https://blog-api-ryanwong.fly.dev/comments/${commentID}`,
        {
          postID: post._id,
        },
      );
      handleCommentDeleteResponse(response, commentID);
    } catch (error) {
      setFlashMessage("An error occurred while trying to delete the comment.");
    }
  }

  async function deleteCommentFromDB(
    url = "https://blog-api-ryanwong.fly.dev/comments",
    data,
  ) {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  function handleCommentDeleteResponse(response, commentID) {
    if (response.info && response.info.message) {
      setFlashMessage(response.info.message);
    } else {
      console.log(response);
      deleteComment(commentID);
    }
  }

  return (
    <section className="mx-16 md:mx-32 lg:mx-48">
      <h4 className="text-slate-700 text-l mb-4">Comments</h4>

      {/* Flash Message */}
      {flashMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {flashMessage}
        </div>
      )}

      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="p-4 mb-8 border rounded-lg bg-white shadow-lg"
          >
            <div className="flex items-center justify-between p-2">
              {/* Comment Author */}
              <p className="text-lg font-semibold text-gray-800">
                {comment.author.username
                  ? comment.author.username
                  : "Anonymous"}
              </p>
              {/* Comment Date */}
              <p className="text-sm text-gray-500">
                {format(new Date(comment.date), "d MMMM yyyy, 'at' p")}
              </p>
            </div>
            {/* Comment Text */}
            <p className="text-gray-700 text-start ml-12 italic">{comment.text}</p>

            {/* Delete Button (conditionally rendered) */}
            {authUser.auth.username === comment.author.username && (
              <button
                className="text-red-600 hover:text-red-700 text-sm"
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <h5>No comments...</h5>
      )}
      {authUser.auth.username && (
        <CommentForm postID={post._id} addComment={addComment} />
      )}
    </section>
  );
}
