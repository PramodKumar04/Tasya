import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../home/PostCard";
import DOMPurify from "dompurify";
import { useAuth } from "../signup/AuthContext";
import { toast } from "react-toastify";
import api from "../../api";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => {
        console.log("Posts fetched successfully:", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/post/${id}`)
      .then((res) => {
        console.log("Fetched post:", res.data);
        setPost(res.data);
      })
      .catch((err) => console.error("Error fetching post:", err));

    api
      .get(`/post/${id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.error("Error fetching comments:", err));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      const res = await api.post(`/post/${id}/comment`, { content: newComment });
      setComments([res.data.comment, ...comments]);
      setNewComment("");
      toast.success("Comment posted!");
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error(err.response?.data?.message || "Failed to add comment. Please make sure you are logged in.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      await api.delete(`/comment/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!user) return toast.info("Please log in to like comments");
    
    try {
      const res = await api.patch(`/comment/${commentId}/like`, {});
      setComments(comments.map(c => 
        c._id === commentId ? { ...c, likes: res.data.likes, likedBy: res.data.liked ? [...(c.likedBy || []), user._id] : (c.likedBy || []).filter(id => id !== user._id) } : c
      ));
      toast.success(res.data.liked ? "Comment liked!" : "Comment unliked");
    } catch (err) {
      console.error("Error liking comment:", err);
      toast.error("Failed to like comment");
    }
  };

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
      <style>
        {`
          .post-content {
            word-wrap: break-word;
            overflow-wrap: break-word;
            word-break: break-word;
            text-align: justify;
            text-justify: inter-word;
          }
          .post-content h1, .post-content h2, .post-content h3, .post-content h4 {
            text-align: left;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
          }
          .post-content p {
            margin-bottom: 1.2rem;
          }
          .post-content img, .post-content video, .post-content iframe {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1.5rem auto;
            border-radius: 8px;
          }
          .post-content pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        `}
      </style>
      <div className="row">
        <div className="col-lg-8 offset-lg-1 col-md-12 bg-white p-4 p-md-5 rounded-4 shadow-sm" style={{ border: '1px solid #f0f0f0', minWidth: 0 }}>
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

          <div 
            className="post-content" 
            style={{ fontSize: "1.25rem", lineHeight: "1.8", color: "#333", position: 'relative' }}
          >
            <div
              dangerouslySetInnerHTML={{ 
                __html: /<[a-z][\s\S]*>/i.test(user ? content : content.substring(0, 300)) 
                  ? DOMPurify.sanitize(user ? content : content.substring(0, 300)) 
                  : DOMPurify.sanitize((user ? content : content.substring(0, 300)).replace(/\n/g, '<br />')) 
              }}
            />
            
            {!user && content.length > 300 && (
              <div className="mt-4 p-4 rounded-4 text-center" style={{ 
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,1))',
                marginTop: '-50px',
                paddingTop: '60px',
                position: 'relative',
                zIndex: 1
              }}>
                <p className="mb-3 fw-bold">Login to continue reading this post</p>
                <a href="/login" className="btn btn-primary px-5 rounded-pill shadow-sm">
                  Login to Tasya
                </a>
              </div>
            )}
          </div>

          <hr className="my-5" style={{ opacity: 0.1 }} />

          {/* Comments Section */}
          <div className="comments-section mt-5">
            <h4 className="fw-bold mb-4">Comments ({comments.length})</h4>
            
            {user ? (
              <form onSubmit={handleAddComment} className="mb-5">
                <div className="d-flex gap-3">
                  <div className="material-icons text-primary mt-1" style={{ fontSize: '32px' }}>account_circle</div>
                  <div className="flex-grow-1">
                    <textarea 
                      className="form-control mb-2"
                      rows="3"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                    ></textarea>
                    <button type="submit" className="btn btn-primary px-4 rounded-pill">
                      Post Comment
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="alert alert-light mb-5 border">
                Please <a href="/login">log in</a> to leave a comment.
              </div>
            )}

            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="d-flex gap-3 mb-4 pb-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <div className="material-icons text-muted" style={{ fontSize: '32px' }}>account_circle</div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                          @{comment.author?.username || "anonymous"}
                        </span>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      
                      <p className="mb-2 text-dark" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{comment.content}</p>
                      
                      <div className="d-flex align-items-center gap-3">
                        <button 
                          onClick={() => handleLikeComment(comment._id)}
                          className="btn btn-sm d-flex align-items-center gap-1 p-0 border-0 bg-transparent shadow-none"
                          style={{ color: comment.likedBy?.includes(user?._id) ? "#065fd4" : "#606060" }}
                        >
                          <span className="material-icons" style={{ fontSize: '16px' }}>
                            {comment.likedBy?.includes(user?._id) ? "thumb_up" : "thumb_up_off_alt"}
                          </span>
                          <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{comment.likes || 0}</span>
                        </button>

                        <button className="btn btn-sm p-0 border-0 bg-transparent text-dark shadow-none" style={{ fontSize: '0.75rem', fontWeight: '500', color: '#606060' }}>
                          Reply
                        </button>

                        {user && (comment.author?._id === user._id || comment.author === user._id) && (
                          <button 
                            onClick={() => handleDeleteComment(comment._id)}
                            className="btn btn-sm p-0 border-0 bg-transparent text-danger shadow-none ms-2"
                            title="Delete"
                          >
                            <span className="material-icons" style={{ fontSize: '16px' }}>delete_outline</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center py-4">No comments yet.</p>
              )}
            </div>
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
