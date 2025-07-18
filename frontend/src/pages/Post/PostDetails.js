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

  const { title, content, image, video, author, createdAt } = post;
  const sortedPosts = [...posts]
    .filter((p) => p._id !== id)
    .sort((a, b) => (b.likes || 0) - (a.likes || 0));
  const trending = sortedPosts.slice(0, 3);

  // Function to render media
  const renderMedia = () => {
    if (video?.url) {
      return (
        <video
          controls
          className="img-fluid"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            marginBottom: "2rem",
            borderRadius: "8px",
          }}
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (image?.url) {
      return (
        <img
          src={image.url}
          alt={title}
          className="img-fluid"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            marginBottom: "2rem",
            borderRadius: "8px",
          }}
        />
      );
    }

    return null;
  };
  return (
    <div
      className="container"
      style={{ marginTop: "8rem", marginBottom: "8rem" }}
    >
      <div className="row">
        <div className="col-lg-9 col-md-12" style={{ padding: "20px" }}>
          <h1>
            <b>{title}</b>
          </h1>
          <h4 style={{ fontSize: "20px" }}>
            <b>Created By: {author?.fullName || "Unknown Author"}</b>
          </h4>
          <h6 style={{ marginBottom: "2rem" }}>
            Created At: {new Date(createdAt).toLocaleString()}
          </h6>

          {/* Render media */}
          {renderMedia()}

          <div style={{ fontSize: "1.2rem" }}>
            {content.split("\n").map((para, index) => (
              <p key={index} style={{ marginBottom: "1rem" }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="col-lg-3 col-md-12" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "25px" }}>
            &nbsp;<b>#Trending</b>
          </h3>
          <div style={{ marginTop: "2rem" }}>
            {trending.length > 0 ? (
              trending.map((post) => (
                <div key={post._id} style={{ marginBottom: "1rem" }}>
                  <PostCard post={post} />
                </div>
              ))
            ) : (
              <p>No trending posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
