import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../signup/AuthContext";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { username: paramUsername } = useParams();
  const { user: currentUser, fetchUser: refreshSession } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  
  const profileInputRef = useRef();
  const backgroundInputRef = useRef();

  const isOwnProfile = !paramUsername || (currentUser && currentUser.username === paramUsername);
  const effectiveUsername = paramUsername || (currentUser && currentUser.username);

  useEffect(() => {
    if (effectiveUsername) {
      fetchProfile();
    }
  }, [effectiveUsername]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://tasya.onrender.com/api/users/profile/${effectiveUsername}`);
      setProfileUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("User not found");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(type, file);

    try {
      setUploading(true);
      await axios.patch("https://tasya.onrender.com/api/users/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      toast.success(`${type === 'profileImage' ? 'Profile' : 'Cover'} photo updated!`);
      await fetchProfile();
      if (isOwnProfile) await refreshSession();
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleBioSave = async () => {
    try {
      await axios.patch("https://tasya.onrender.com/api/users/update", { bio: newBio }, {
        withCredentials: true
      });
      toast.success("Bio updated!");
      setEditingBio(false);
      fetchProfile();
    } catch (err) {
      console.error("Bio update error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update bio");
    }
  };

  const handleFollow = async () => {
    if (!currentUser) return toast.info("Please login to follow");
    try {
      const isFollowing = profileUser.followers.some(f => String(f._id) === String(currentUser._id));
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      await axios.post(`https://tasya.onrender.com/api/users/${endpoint}/${profileUser._id}`, {}, { withCredentials: true });
      toast.success(isFollowing ? "Unfollowed" : "Following");
      fetchProfile();
    } catch (err) {
      console.error("Follow error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (!profileUser) return <div className="text-center mt-5"><h3>User not found</h3></div>;

  return (
    <div className="container mt-5 pb-5">
      {/* Cover Photo Section */}
      <div className="position-relative rounded-4 shadow-lg" style={{ height: "350px" }}>
        <img
          src={profileUser.backgroundImage?.url || "https://images.unsplash.com/photo-1699891730676-037bed3c1bed?q=80&w=1200"}
          className="img-fluid w-100 h-100 rounded-4"
          alt="Cover"
          style={{ objectFit: "cover", transition: "0.3s" }}
        />
        {isOwnProfile && (
          <div 
            className="position-absolute top-0 end-0 m-3 p-2 bg-white rounded-circle shadow-sm cursor-pointer"
            onClick={() => backgroundInputRef.current.click()}
            style={{ opacity: 0.8, cursor: "pointer" }}
          >
            <span className="material-icons">camera_alt</span>
            <input type="file" ref={backgroundInputRef} hidden onChange={(e) => handleImageUpload(e, 'backgroundImage')} />
          </div>
        )}

        {/* Overlapping Profile Image */}
        <div
          className="position-absolute"
          style={{ bottom: "-60px", left: "40px" }}
        >
          <div className="position-relative">
            <img
              src={profileUser.profileImage?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt="Profile"
              className="rounded-circle border border-4 border-white shadow-lg"
              style={{ width: "180px", height: "180px", objectFit: "cover" }}
            />
            {isOwnProfile && (
              <div 
                className="position-absolute bottom-0 end-0 m-2 p-1 bg-primary text-white rounded-circle shadow-sm cursor-pointer"
                onClick={() => profileInputRef.current.click()}
                style={{ cursor: "pointer" }}
              >
                <span className="material-icons" style={{ fontSize: "20px" }}>edit</span>
                <input type="file" ref={profileInputRef} hidden onChange={(e) => handleImageUpload(e, 'profileImage')} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacing Below Image */}
      <div className="pt-5" />

      {/* Profile Details and Stats */}
      <div className="row mt-4 align-items-center">
        <div className="col-md-7 ps-md-5 mt-3 mt-md-0">
          <h2 className="fw-bold mb-1">{profileUser.username}</h2>
          
          {editingBio ? (
            <div className="mb-4 mt-2" style={{ maxWidth: "400px" }}>
              <textarea 
                className="form-control form-control-sm mb-2 shadow-none" 
                value={newBio} 
                onChange={(e) => setNewBio(e.target.value)}
                maxLength="150"
                rows="2"
                style={{ resize: "none", backgroundColor: "#f8f9fa", border: "1px solid #ced4da", borderRadius: "8px" }}
                autoFocus
                placeholder="Write a little bit about yourself..."
              />
              <div className="d-flex justify-content-end align-items-center">
                <span className="text-secondary me-3" style={{ cursor: "pointer", fontSize: "14px", fontWeight: "600" }} onClick={() => setEditingBio(false)}>Cancel</span>
                <span className="text-primary" style={{ cursor: "pointer", fontSize: "14px", fontWeight: "600" }} onClick={handleBioSave}>Save</span>
              </div>
            </div>
          ) : (
            <div className="mb-3 mt-2 d-flex align-items-start">
              <p className="text-muted mb-0 me-2" style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>{profileUser.bio || "No bio yet."}</p>
              {isOwnProfile && (
                <span 
                  className="material-icons text-muted mt-1"
                  onClick={() => { setNewBio(profileUser.bio || ""); setEditingBio(true); }}
                  title="Edit Bio"
                  style={{ cursor: "pointer", fontSize: "16px", opacity: 0.7 }}
                >
                  edit
                </span>
              )}
            </div>
          )}
          
          {!isOwnProfile && (
            <button 
              className={`btn ${profileUser.followers.some(f => String(f._id) === String(currentUser?._id)) ? 'btn-outline-secondary' : 'btn-primary'} rounded-pill px-4 fw-bold`}
              onClick={handleFollow}
            >
              {profileUser.followers.some(f => String(f._id) === String(currentUser?._id)) ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        <div className="col-md-5">
          <div className="d-flex justify-content-around bg-light p-4 rounded-4 shadow-sm">
            <div className="text-center cursor-pointer">
              <h5 className="mb-0 fw-bold">{profileUser.followers.length}</h5>
              <small className="text-muted">Followers</small>
            </div>
            <div className="text-center cursor-pointer">
              <h5 className="mb-0 fw-bold">{profileUser.following.length}</h5>
              <small className="text-muted">Following</small>
            </div>
            <div className="text-center">
              <h5 className="mb-0 fw-bold">--</h5>
              <small className="text-muted">Posts</small>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {uploading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
          <div className="text-center">
            <div className="spinner-grow text-primary mb-2"></div>
            <h5>Uploading your spark...</h5>
          </div>
        </div>
      )}
    </div>
  );
}
