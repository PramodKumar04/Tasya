import PostCard from "./PostCard";

export default function Posting({ posts }) {
  return (
    <div className="row g-4 mt-2">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
            <PostCard post={post} />
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5">
           <span className="material-icons text-muted display-1">auto_stories</span>
           <p className="lead text-muted">No stories found yet. Be the first to ignite one!</p>
        </div>
      )}
    </div>
  );
}
