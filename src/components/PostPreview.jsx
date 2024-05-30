import PropTypes from "prop-types";
import { format } from "date-fns";

PostPreview.propTypes = {
  postData: PropTypes.array,
  handlePostClick: PropTypes.func,
};

export default function PostPreview({ postData, handlePostClick }) {
  const PREVIEW_LENGTH = 100;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:px-6">
      {postData && postData.length > 0 ? (
        postData.map((post) => (
          <div
            key={post._id}
            onClick={() => {
              handlePostClick(post);
            }}
            className="bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-6 hover:shadow-xl transition duration-300"
          >
            <img
              className="w-full h-56 object-cover object-center"
              src="https://preview.cruip.com/open-pro/images/blog-post-01.jpg"
              alt="Post Preview"
            />
            <div className="p-4">
              <div className="mb-3">
                <ul className="flex flex-wrap text-xs font-medium -m-1">
                  <li className="m-1">
                    <div className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out">
                      {post.category ? (
                        <p>{post.category}</p>
                      ) : (
                        <p>No Category</p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
              <h3 className="text-xl lg:text-2xl text-gray-300 font-bold leading-tight mb-2">
                <a
                  href=""
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  {post.title}
                </a>
              </h3>
              <p className="text-gray-400">
                {post.text.substring(0, PREVIEW_LENGTH)}...
              </p>
              <footer className="flex items-center mt-4">
                <div>
                  {post.author ? (
                    <span className="text-gray-300">
                      {post.author.username}
                    </span>
                  ) : (
                    <span className="text-gray-300">Anonymous</span>
                  )}

                  <span className="text-gray-500">
                    {" "}
                    - {format(post.date, "MMM d, yyyy")}
                  </span>
                </div>
              </footer>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-200">No posts available</div>
      )}
    </div>
  );
}
