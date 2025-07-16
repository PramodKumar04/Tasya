import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PostCard({ post, currentUserId }) {
  const { _id, title, content, image, author, category, createdAt } = post;

  // Likes and liked state (local to this card)
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likedBy?.includes(currentUserId));

  const handleClick = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/post/${_id}/like`,
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

  return (
    <div className="card post-card" style={{ width: "18rem" ,marginBottom: "1rem"}}>
      <img
        src={image.url}
        className="card-img-top card-img"
        alt={title}
        style={{ height: "12rem" }}
      />
      <div class="card-body">
        <h5 class="card-title">
          <b>{title}</b>
        </h5>
        
        <p
          className="card-text"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {content}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={handleClick}
            style={{
              background: "none",
              border: "none",
              paddingRight: "7rem",
              margin: "0",
              cursor: "pointer",
              color: liked ? "red" : "gray",
              fontSize: "15px",
            }}
          >
            <i
              className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            ></i>{" "}
            &nbsp;
            <span style={{ color: "gray", fontSize: "15px" }}>{likes}</span>
          </button>

          <Link
            to={`/post/${post._id}`}
            style={{
              border: "1px solid black",
              textDecoration: "none",
              textAlign: "center",
              color: "black",
              fontSize: "16px",
              padding: "5px 10px",
              borderRadius: "25px",
            }}
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
}
