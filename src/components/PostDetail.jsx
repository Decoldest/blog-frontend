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
    <div className="bg-slate-50">
      {loading ? (
        <h1 className="text-3xl font-bold">Loading Post...</h1>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : !postDetail || postDetail.length === 0 ? (
        <div>Post Not Found</div>
      ) : (
        <div>
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-6 hover:shadow-xl transition duration-300">
            <div className="p-4">
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
              <h3 className="text-xl lg:text-2xl text-gray-300 font-bold leading-tight mb-2">
                <a
                  href="#0"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  {postDetail.post.title}
                </a>
              </h3>
              <p className="text-gray-400">{postDetail.post.text}...</p>
              <footer className="flex items-center mt-4">
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
                    {/* - {format(postDetail.date, "MMM d, yyyy")} */}
                  </span>
                </div>
              </footer>
            </div>
          </div>
          {postDetail.comments.map((comment) => (
            <div
              key={comment._id}
              className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg"
            >
              <div className="flex flex-col w-full">
                <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                  {comment.author.username ? (comment.author.username) : "Anonymous"}
                </p>
                <p className="text-gray-400 text-sm">{format(post.date, "MMM d, yyyy")}</p>
              </div>
              <p className="-mt-4 text-gray-500">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setSelectedPost(null)}>Close</button>
    </div>
  );
}
