import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format } from "date-fns";

PostDetail.propTypes = {
  selectedPost: PropTypes.object,
  setSelectedPost: PropTypes.func,
};

export default function PostDetail({ selectedPost, setSelectedPost }) {
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getPostDetail() {
      try {
        const response = await fetch(
          `https://blog-api-ryanwong.fly.dev/posts/${selectedPost._id}`,
          {
            mode: "cors",
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPostDetail(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getPostDetail();
  }, [selectedPost._id]);

  useEffect(() => {
    console.log("Updated postDetail:", postDetail);
  }, [postDetail]);

  return (
    <div className="bg-slate-50 p-8 md:p-24 lg:p-32">
      {loading ? (
        <h1 className="text-3xl font-bold">Loading Post...</h1>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : !postDetail || postDetail.length === 0 ? (
        <div>Post Not Found</div>
      ) : (
        <div >
          {/* Post Container */}
          <div className="mb-16 md:mb-20 lg:mb-28 border-b-2">
            {/* Category Badge */}
            <div className="mb-3">
              <ul className="flex flex-wrap text-xs font-medium -m-1">
                <li className="m-1">
                  <div className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out">
                    {postDetail.post.category ? (
                      <p>{postDetail.post.category}</p>
                    ) : (
                      <p>No Category</p>
                    )}
                  </div>
                </li>
              </ul>
            </div>
            {/* Post Title */}
            <h3 className="text-xl lg:text-2xl text-gray-800 font-bold leading-tight mb-2 text-left">
                {postDetail.post.title}
            </h3>
            <div className="flex items-center mt-4">
              {/* Author and Date */}
              <div>
                {postDetail.post.author ? (
                  <span className="text-gray-300">
                    {postDetail.post.author.username}
                  </span>
                ) : (
                  <span className="text-gray-300">Anonymous</span>
                )}
                <span className="text-gray-500">
                  {" "}
                  {/* Format post date */}-{" "}
                  {format(new Date(postDetail.post.date), "MMM d, yyyy")}
                </span>
              </div>
            </div>
            {/* Post Content */}
            <p className="text-gray-700 text-xl">{postDetail.post.text}</p>
          </div>

          {/* Comments Section */}
          <section className="mx-16 md:mx-32 lg:mx-48">
            <h4 className="text-slate-700 text-l mb-4">Comments</h4>
            {postDetail.comments && postDetail.comments.length > 0 ? (
              postDetail.comments.map((comment) => (
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
          </section>
        </div>
      )}
      <button onClick={() => setSelectedPost(null)}>Close</button>
    </div>
  );
}
