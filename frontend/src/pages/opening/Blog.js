import React from "react";
import {Link} from 'react-router-dom';
function Blog() {
  return (
    <div
      className="container-fluid p-5 mt-5 mb-5"
      style={{ background: "linear-gradient(to right, #fdfbfb, #ebedee)" }}
    >
      <div className="row">
        <div className="col-lg-6  p-5">
          <img
            src="media/blogimage.png"
            alt="Connect"
            className="img-fluid"
            style={{ width: "100%", borderRadius: "15px" }}
          />
        </div>
        <div className="col-lg-6 p-3 mb-5">
          <h1 className="mt-4" style={{ borderSize: "17px" }}>
            Step Into the World of Words...
          </h1>
          <hr
            style={{
              height: "3px",
              backgroundColor: "#6f42c1",
              border: "none",
              borderRadius: "2px",
              margin: "2rem 0",
            }}
          />
          <p className="mt-3" style={{ fontSize: "18px" }}>
            Ignite the writer in you and step into a world of meaningful stories
            and fresh perspectives. From thrilling travel adventures to
            game-changing tech insights, delicious recipes to mindful living
            tips — discover creators who spark ideas and stir curiosity. Ready
            to share your journey? Let your voice be heard and connect with
            readers around the world.
          </p>
          <Link to="/signup">
            <button
              className="btn btn-primary mt-5"
              style={{
                width: "30%",
                fontSize: "20px",
                backgroundColor: "#6C5CE7",
              }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Blog;
