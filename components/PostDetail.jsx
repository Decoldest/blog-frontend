import PropTypes from "prop-types";

PostDetail.propTypes = {
  selectedPost: PropTypes.object,
  setSelectedPost: PropTypes.func,
};

export default function PostDetail({selectedPost, setSelectedPost}) {
  return (
    <div>
      {selectedPost ? (
        <div key={selectedPost._id}>
          <h1>{selectedPost.title}</h1>
          <p>{selectedPost.text}</p>
        </div>
      ) : (
        <div>No post found</div>
      )}
      <button onClick={() => setSelectedPost(null)}>Close</button>
    </div>
  );
}
