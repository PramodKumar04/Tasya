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
        <div className="col-lg-8 offset-lg-1 col-md-12 bg-white p-4 p-md-5 rounded-4 shadow-sm" style={{ border: '1px solid #f0f0f0' }}>
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#1a1a1a' }}>
            {title}
          </h1>
          
          <div className="d-flex align-items-center gap-3 mb-4">
             <div className="material-icons text-primary" style={{ fontSize: '40px' }}>account_circle</div>
             <div>
                <h6 className="mb-0 fw-bold">By {author?.username || author?.fullName || "Anonymous"}</h6>
                <small className="text-muted">{new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</small>
             </div>
          </div>

          <hr className="my-4" style={{ opacity: 0.1 }} />

          {/* Render media */}
          <div className="media-container mb-5 shadow-sm rounded-4 overflow-hidden">
            {renderMedia()}
          </div>

          <div className="post-content" style={{ fontSize: "1.25rem", lineHeight: "1.8", color: "#333" }}>
            {content.split("\n").map((para, index) => (
              <p key={index} className="mb-4">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="col-lg-3 col-md-12 mt-5 mt-lg-0">
          <div className="sticky-top" style={{ top: '100px' }}>
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <span className="material-icons text-warning">trending_up</span>
              Trending
            </h4>
            <div className="trending-list">
              {trending.length > 0 ? (
                trending.map((post) => (
                  <div key={post._id} className="mb-4">
                    <PostCard post={post} />
                  </div>
                ))
              ) : (
                <p className="text-muted">Stay tuned for trending stories.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
