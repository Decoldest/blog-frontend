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
  editComment: PropTypes.func,
};

export default function Comments({
  comments,
  post,
  addComment,
  deleteComment,
  editComment,
}) {
  const authUser = useContext(AuthContext);
  const [flashMessage, setFlashMessage] = useState(null);
  const [editID, setEditID] = useState(null);
  const [commentText, setCommentText] = useState("");

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

  async function handleEdit(commentID) {
    try {
      const response = await editCommentInDB(
        `https://blog-api-ryanwong.fly.dev/comments/${commentID}`,
        {
          postID: post._id,
          text: commentText,
        },
      );
      handleCommentEditResponse(response, commentID);
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

  async function editCommentInDB(
    url = "https://blog-api-ryanwong.fly.dev/comments",
    data,
  ) {
    const response = await fetch(url, {
      method: "PUT",
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

  function handleCommentEditResponse(response, commentID) {
    if (response.info && response.info.message) {
      setFlashMessage(response.info.message);
    } else {
      const editedComment = {
        ...response.updatedComment,
        author: { username: authUser.auth.username },
      };
      editComment(editedComment, commentID);
    }
  }

  return (
    <section className="mx-10 xs:mx-4 md:mx-18 lg:mx-20 min-w-fit">
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
              <div>
                <p className="hidden sm:block text-sm text-gray-500">
                  {format(new Date(comment.date), "d MMMM yyyy, 'at' p")}
                </p>
                <p className="block sm:hidden text-sm text-gray-500">
                  {format(new Date(comment.date), "MM/dd/yyyy")}
                </p>
              </div>
            </div>
            {/* Comment Text */}
            {comment._id === editID ? (
              <div>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-8 border border-sky-500"
                  required
                />
              </div>
            ) : (
              <p className="text-gray-700 text-start ml-12 italic">
                {comment.text}
              </p>
            )}

            {/* Delete Button (conditionally rendered) */}
            {authUser.auth.username === comment.author.username && (
              <div className="flex items-center justify-center gap-4">
                {comment._id === editID ? (
                  <button
                    className="text-blue-600 hover:text-blue-900 text-sm"
                    onClick={() => {
                      handleEdit(comment._id);
                      setCommentText("");
                      setEditID(null);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-blue-600 hover:text-blue-900 text-sm"
                    onClick={() => {
                      setCommentText(comment.text);
                      setEditID(comment._id);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-red-600 hover:text-red-700 text-sm"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <h5>No comments...</h5>
      )}
      {authUser.auth.username ? (
        <CommentForm postID={post._id} addComment={addComment} />
      ) : (
        <div className="my-8 p-4 text-gray-700 text-center font-semibold rounded-lg flex items-center justify-center space-x-2">
          <span>Log in to post a comment</span>
        </div>
      )}
    </section>
  );
}
