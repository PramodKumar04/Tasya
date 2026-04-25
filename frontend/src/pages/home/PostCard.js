import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../signup/AuthContext";
import "./PostCard.css";

export default function PostCard({ post }) {
  const { user } = useAuth();
  const currentUserId = user?._id;
  const { _id, title, content, image, video, author, category, createdAt } = post;

  // Likes and liked state (local to this card)
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(post.likedBy?.includes(currentUserId) || false);

  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleClick = async () => {
    try {
      const res = await axios.patch(
        `https://tasya.onrender.com/api/post/${_id}/like`,
        {
          userId: currentUserId,
        }
      );
      setLikes(res.data.likes);
      setLiked(res.data.liked);
    } catch (err) {
      console.error("Error liking/unliking post", err);
    }
  };

  // Function to render media (image or video)
  const renderMedia = () => {
    if (image?.url) {
      return (
        <img
          src={image.url}
          className="glass-img"
          alt={title}
        />
      );
    } else if (video?.url) {
      return (
        <video
          src={video.url}
          className="glass-img"
          muted
          loop
          autoPlay
          playsInline
          controls={false}
          onMouseEnter={(e) => e.target.play()}
          onMouseLeave={(e) => e.target.pause()}
        >
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <div
          style={{
            height: "220px",
            backgroundColor: "rgba(0,0,0,0.02)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#8e8e93",
            fontStyle: "italic",
            fontSize: "0.9rem"
          }}
        >
          No media available
        </div>
      );
    }
  };

  return (
    <div className="glass-card">
      <Link to={`/post/${_id}`} className="text-decoration-none">
        <div className="glass-media-wrapper">
          {renderMedia()}
        </div>
      </Link>

      <div className="glass-card-body">
        <div className="d-flex justify-content-between align-items-center">
           <span className="glass-category">{category}</span>
           <span className="glass-date">{new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        
        <Link to={`/post/${_id}`} className="text-decoration-none">
          <h5 className="glass-title">
            {title}
          </h5>
        </Link>

        <p className="glass-text">
          {stripHtml(content).length > 150 
            ? stripHtml(content).substring(0, 150) + "..." 
            : stripHtml(content)}
        </p>

        <div className="glass-footer">
          <button
            onClick={handleClick}
            className="glass-like-btn"
            style={{ color: liked ? "#ff2d55" : "#8e8e93" }}
          >
            <span className="material-icons glass-like-icon">{liked ? "favorite" : "favorite_border"}</span>
            <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{likes}</span>
          </button>

          <Link
            to={`/post/${_id}`}
            className="glass-read-btn"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}