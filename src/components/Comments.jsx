import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { format } from "date-fns";
import CommentForm from "./CommentForm";

Comments.propTypes = {
  comments: PropTypes.array,
  post: PropTypes.object,
  addComment: PropTypes.func,
};

export default function Comments({ comments, post, addComment }) {
  const authUser = useContext(AuthContext);

  return (
    <section className="mx-16 md:mx-32 lg:mx-48">
      <h4 className="text-slate-700 text-l mb-4">Comments</h4>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg"
          >
            <div className="flex flex-col w-full">
              {/* Comment Author */}
              <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                {comment.author.username
                  ? comment.author.username
                  : "Anonymous"}
              </p>
              {/* Comment Date */}
              <p className="text-gray-400 text-sm">
                {format(new Date(comment.date), "d MMMM yyyy, 'at' p")}
              </p>
            </div>
            {/* Comment Text */}
            <p className="-mt-4 text-gray-500">{comment.text}</p>
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
