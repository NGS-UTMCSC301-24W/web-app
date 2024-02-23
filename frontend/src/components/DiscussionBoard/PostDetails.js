import { useEffect, useState } from "react";
import constants from "../../constants.json";

const Post = (router) => {
  const id = router.match.params.id;
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    const response = await fetch(
      `${constants.API_BASE_URL}/discussion-board/?id=${id}`,
      { credentials: "include" }
    );
    if (response.ok) {
      const data = await response.json();
      setPost(data);
    } else {
      alert("Failed to fetch post!");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className='container'>
      <h1 className="h1">
        {post ? post.title : "Loading..."}
      </h1>
      <p>
        {post ? post.content : "Loading..."}
      </p>
    </div>
  );
};
export default Post;
