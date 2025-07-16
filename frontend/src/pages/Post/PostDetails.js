import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../home/PostCard";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        console.log("Posts fetched successfully:", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/post/${id}`)
      .then((res) => {
        console.log("Fetched post:", res.data);
        setPost(res.data);
      })
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post)
    return <div style={{ padding: "2rem" }}>Loading post details...</div>;

  const { title, content, image, author, createdAt } = post;
  const sortedPosts = [...posts]
    .filter((p) => p._id !== id)
    .sort((a, b) => b.likes - a.likes);
  const trending = sortedPosts.slice(0, 3);

  return (
    <div className="container" style={{ marginTop: "8rem", marginBottom: "8rem" }}>
      <div className="row">
        
        <div className="col-lg-8 col-md-12" style={{ padding: "20px" }}>
          <h1><b>{title}</b></h1>
          <h4 style={{ fontSize: "20px" }}>
            <b>Created By: {author.fullName}</b>
          </h4>
          <h6 style={{ marginBottom: "2rem" }}>
            Created At: {new Date(createdAt).toLocaleString()}
          </h6>
          <img
            src={image.url}
            alt={title}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "fill",
              marginBottom: "2rem",
            }}
          />
          <p style={{ fontSize: "1.2rem" }}>{content}</p>
        </div>

        <div className="col-lg-4 col-md-12" style={{ padding: "10rem" }}>
          <h3 style={{fontSize:"25px"}}>&nbsp;<b>#Trending</b></h3>
          {trending.length > 0 ? (
            trending.map((post) => <PostCard key={post._id} post={post} style={{padding:"2rem"}} />)
          ) : (
            <p>No trending posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
