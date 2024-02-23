import { useEffect, useState } from "react";
import constants from "../../constants.json";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const DiscussionBoard = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await fetch(
      `${constants.API_BASE_URL}/discussion-board/query?page=${page}`,
      { credentials: "include" }
    );
    const data = await response.json();
    setPosts([...posts, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  if (loading) {
    return (
      <div className="container">
        <h1 className="h1">Discussion Board</h1>
        <p>Discuss anything related to housing here.</p>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1 className="h1">Discussion Board</h1>
      <p>Discuss anything related to housing here.</p>
      <Link to="/discussion-board/new" className="btn btn-primary mb-2">
        New Post
      </Link>
      <ul className="list-group mb-2">
        {posts.map((post) => (
          <Link to={`/discussion-board/${post.id}`} className="list-group-item" key={post.id}>
            <div className="me-auto">
              <div className="fw-bold" style={truncateStyle}>{post.title}</div>
              <div style={truncateStyle}>{post.author.username}: {post.content}</div>
            </div>
          </Link>
        ))}
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => setPage(page + 1)}
      >
        Load More
      </button>
    </div>
  );
};

const truncateStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

export default DiscussionBoard;
