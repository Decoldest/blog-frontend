import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Comments from "./Comments";

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

  const addComment = (newComment) => {
    if (postDetail) {
      const updatedComments = [...postDetail.comments, newComment];
      setPostDetail({
        ...postDetail,
        comments: updatedComments,
      });
    }
  };

  return (
    <div className="bg-slate-50 p-8 md:p-24 lg:p-32">
      {loading ? (
        <h1 className="text-3xl font-bold">Loading Post...</h1>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : !postDetail || postDetail.length === 0 ? (
        <div>Post Not Found</div>
      ) : (
        <div>
          {/* Post Container */}
          <div className="mb-8 md:mb-10 lg:mb-14 border-b-2">
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
                  <span className="text-gray-400">
                    {postDetail.post.author.username}
                  </span>
                ) : (
                  <span className="text-gray-400">Anonymous</span>
                )}
                <span className="text-gray-500">
                  {" "}
                  {/* Format post date */}-{" "}
                  {format(new Date(postDetail.post.date), "MMM d, yyyy")}
                </span>
              </div>
            </div>
            {/* Post Content */}
            <p className="text-gray-700 text-xl py-8 md:mb-10 lg:mb-12">
              {postDetail.post.text}
            </p>
          </div>

          {/* Comments Section */}
          <Comments
            comments={postDetail.comments}
            post={postDetail}
            addComment={addComment}
          />
        </div>
      )}
      <button onClick={() => setSelectedPost(null)}>Close</button>
    </div>
  );
}
