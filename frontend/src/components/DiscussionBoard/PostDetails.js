import { useEffect, useState } from "react";
import constants from "../../constants.json";
import { Link, useHistory } from "react-router-dom";

const Post = (router) => {
  const id = router.match.params.id;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);

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

  const fetchComments = async () => {
    const response = await fetch(
      `${constants.API_BASE_URL}/discussion-board/query?parentId=${id}&page=${page}`,
      { credentials: "include" }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.length === 0 || data.length < 10) {
        setLastPage(true);
      }
      setComments([...comments, ...data]);
    } else {
      alert("Failed to fetch comments!");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [page]);

  return (
    <div className='container'>
      <h1>{post ? post.title : "Loading..."}</h1>
      <div className="d-grid gap-3 ">
        <Comment
          id={post ? post.id : "Loading..."}
          author={post ? post.author.username : "Loading..."}
          content={post ? post.content : "Loading..."}
          editable={post ? true : true}
        />
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            author={comment.author.username}
            content={comment.content}
            editable={comment.editable}
            onCommentDelete={(id) => setComments(comments.filter((c) => c.id !== id))}
          />
        ))}
        {lastPage && <p>No more comments to load!</p>}
        {!lastPage && (
          <button
            className="btn btn-primary"
            onClick={() => setPage(page + 1)}
          >
            Load More
          </button>
        )}
        <Reply
          parentId={post ? post.id : "Loading..."}
          onSuccess={(comment) => setComments([...comments, comment])}
        />
      </div>
    </div>
  );
};

const Comment = ({ id, author, content, editable, onCommentDelete }) => {
  const history = useHistory();
  const deleteComment = async () => {
    const response = await fetch(
      `${constants.API_BASE_URL}/discussion-board/`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      if (data.parentId) {
        onCommentDelete(id);
      } else {
        history.push(`/discussion-board/`);
      }
    } else {
      alert("Failed to delete comment!");
    }
  };

  return (
    <div className="card w-100" style={{ width: "18rem" }}>
      <div className="card-body">
        <p className="card-text">
          <b>{author}:</b> {content}
        </p>
        {editable && (
          <div className="btn-group">
            <Link to={`/discussion-board/edit/${id}`} className="btn btn-primary">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={deleteComment}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Reply = ({ parentId, onSuccess }) => {
  const [content, setContent] = useState("");

  const reply = async () => {
    const response = await fetch(`${constants.API_BASE_URL}/discussion-board/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "",
        content,
        parentId,
      }),
      credentials: "include",
    });
    const data = await response.json();

    if (response.ok) {
      setContent("");
      onSuccess({
        ...data,
        author: { username: "You" },
      });
    } else {
      alert("Failed to reply!");
    }
  }

  return (
    <div>
      <h1>Reply</h1>
      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          rows="3"
          placeholder="Content"
        />
      </div>
      <button className="btn btn-primary" onClick={reply}>Submit</button>
    </div>
  );
};

export default Post;
