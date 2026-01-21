import PostCard from "./PostCard";

export default function Posting({ posts }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
