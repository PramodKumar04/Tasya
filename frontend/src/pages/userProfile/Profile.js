import React from "react";

const Profile = () => {
  return (
    <div className="container mt-5 pb-5">
      {/* Cover Photo Section */}
      <div className="position-relative">
        <img
          src="https://images.unsplash.com/photo-1699891730676-037bed3c1bed?q=80&w=1200&auto=format&fit=crop"
          className="img-fluid rounded shadow"
          alt="Cover"
          style={{
            width: "100%",
            maxHeight: "320px",
            objectFit: "cover",
          }}
        />

        {/* Overlapping Profile Image */}
        <div
          className="position-absolute"
          style={{
            bottom: "-70px",
            left: "40px",
          }}
        >
          <img
            src="https://corp.formula1.com/wp-content/uploads/2025/03/F1_WBDO_FEATURED_IMAGE_MAIN_1920x1080-1.jpg"
            alt="Profile"
            className="rounded-circle border border-4 border-white shadow-lg"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Spacing Below Image */}
      <div className="pt-5" />

      {/* Profile Details and Stats Side by Side */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3" style={{  marginLeft:"5rem", paddingTop:"2rem"}}>
        {/* User Details */}
        <div className="me-md-4 mb-4 mb-md-0 ml-6" style={{ minWidth: "300px", flex: "1" }}>
          <h4 className="mb-2">User Name</h4>
          <p className="text-muted mb-1">Short headline or role</p>
          <p className="mb-0 text-secondary">
            Bio of the user. <br />
            <span style={{ fontSize: "0.95rem"  }}>Random text about the user here.</span>
          </p>
        </div>

        {/* Followers, Following, Posts */}
        <div className="d-flex gap-4" style={{ flex: "1", justifyContent: "flex-end", paddingBottom:"5rem", paddingRight:"2rem" }}>
          <div className="text-center">
            <h6 className="mb-1">Followers</h6>
            <span className="fw-bold fs-5">2,340</span>
          </div>
          <div className="text-center">
            <h6 className="mb-1">Following</h6>
            <span className="fw-bold fs-5">198</span>
          </div>
          <div className="text-center">
            <h6 className="mb-1">Posts</h6>
            <span className="fw-bold fs-5">56</span>
          </div>
        </div>
      </div>
      <hr></hr>



    </div>
  );
};

export default Profile;
