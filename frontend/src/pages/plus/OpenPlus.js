import React from "react";
import { useNavigate } from "react-router-dom";

function OpenPlus() {
  const navigate = useNavigate();
  return (
    <div
      className="container mb-5"
    >
      <div className="row text-center">
        <div className="col-3 mt-5"></div>
        <div className="col-6 mt-5">
          <h1
            className="mt-5 "
            style={{ color: "#424242", fontSize: "normal" }}
          >
            Join the Creative Hub Plus Community
          </h1>
          <p className=" mt-4 mb-5" style={{ fontSize: "1.1rem" }}>
            Unlock the full potential of your blogging journey with{" "}
            <strong>Plus Membership</strong>. Get access to AI-powered writing
            assistance, become a verified creator, and reach a wider audience —
            all for just <strong>₹299/year</strong>. Elevate your content, grow
            your readership, and join a thriving creator community today!
          </p>
          <button
            className="btn btn-primary"
            style={{
              width: "30%",
              fontSize: "20px",
              backgroundColor: "#6C5CE7",
            }}
          >
            Join Plus Now
          </button>
        </div>
        <div className="col-3 mt-5"></div>
      </div>
    </div>
  );
}

export default OpenPlus;
