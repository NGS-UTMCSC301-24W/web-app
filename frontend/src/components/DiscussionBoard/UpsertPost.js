import { useEffect, useState } from "react";
import constants from "../../constants.json";

const UpsertPost = (router) => {
  const id = router.match.params.id;
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

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

  const onSubmit = async () => {
    const response = await fetch(`${constants.API_BASE_URL}/discussion-board/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: post.id,
        title: post.title,
        content: post.content,
        parentId: post.parentId ?? undefined,
      }),
      credentials: "include",
    });
    const data = await response.json();

    if (response.ok) {
      if (data.parentId) {
        router.history.push(`/discussion-board/${data.parentId}`);
      } else {
        router.history.push(`/discussion-board/${data.id}`);
      }
    } else {
      alert("Failed to upsert post!");
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <div className='container'>
      <h1 className="h1">
        {id ? "Edit Post" : "New Post"}
      </h1>
      {!post.parentId && (
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            className="form-control"
            placeholder="Title"
          />
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="form-control"
          rows="3"
          placeholder="Content"
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
    </div>
  );
};
export default UpsertPost;
