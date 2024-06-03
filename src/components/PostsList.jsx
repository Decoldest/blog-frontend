import { useState, useEffect } from "react";
import PostPreview from "./PostPreview";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function PostsList() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        <Loading text="Posts" />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : !postData || postData.length === 0 ? (
        <div>No posts available</div>
      ) : (
        <PostPreview postData={postData} handlePostClick={handlePostClick} />
      )}
    </div>
  );
}
