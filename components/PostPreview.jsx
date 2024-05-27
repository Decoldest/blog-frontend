import PropTypes from "prop-types";

PostPreview.propTypes = {
  postData: PropTypes.array,
  setSelectedPost: PropTypes.func,
};

export default function PostPreview({ postData, setSelectedPost }) {
  const PREVIEW_LENGTH = 100;

  return (
    <div>
      {postData && postData.length > 0 ? (
        postData.map((post) => (
          <div key={post._id} onClick={() => setSelectedPost(post)}>
            <h1>{post.title}</h1>
            <p>{post.text.substring(0, PREVIEW_LENGTH)}...</p>
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
}
