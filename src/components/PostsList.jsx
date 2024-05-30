import { useState, useEffect } from "react";
import PostPreview from "./PostPreview";
import PostDetail from "./PostDetail";
import { useNavigate } from "react-router-dom";

export default function PostsList() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPostData() {
      try {
        const response = await fetch(
          "https://blog-api-ryanwong.fly.dev/posts",
          {
            mode: "cors",
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setPostData(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getPostData();
  }, []);

  const handlePostClick = (post) => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <div className="bg-slate-50">
      {loading ? (
        <h1 className="text-3xl font-bold underline">Loading Posts...</h1>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : !postData || postData.length === 0 ? (
        <div>No posts available</div>
      ) : (
        <PostPreview postData={postData} setSelectedPost={setSelectedPost} handlePostClick={handlePostClick}/>
      )}
    </div>
  );
}
