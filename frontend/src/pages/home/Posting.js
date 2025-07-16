import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

export default function Posting() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => {
        console.log("Posts fetched successfully:", res.data);
        setPosts(res.data);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  return (
    <div  style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard key={post._id} post={post}  />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
