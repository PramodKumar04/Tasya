import React from "react";
import{Link} from 'react-router-dom';

function NewsLetter() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 p-3 mb-5">
          <h1 className="mt-4" style={{ borderSize: "1rem" }}>
            Make Your Mark : Share with the World
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
          <p className="mt-3" style={{ fontSize: "20px" }}>
            Upload newsletters that inform or vlogs that showcase your
            personality — all in one place. With multi-format support and
            built-in analytics, you can track engagement, connect with your
            audience, and elevate your content strategy.
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
        <div className="col-lg-6 p-5 mt-5" style={{display: "flex", justifyContent: "center"}}>
          <img
            src="media/uploading.png"
            alt="Connect"
            className="img-fluid"
            style={{ width: "100%", borderRadius: "15px" }}
          />
        </div>
          
      </div>
    </div>
  );
}

export default NewsLetter;
