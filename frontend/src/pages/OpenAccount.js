import React from "react";
import { Link,useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-5 mb-5" style={{background: 'linear-gradient(to right, #fdfbfb, #ebedee)'}}>
      <div className="row text-center">
        <div className="col-3 mt-5"></div>
        <div className="col-6 mt-5">
            <h1 className="mt-5 " style={{ color: "#424242", fontSize: "normal" }}>
            Join the Creative Hub Community
            </h1>
            <p className="mt-4 mb-4" style={{ fontSize: "20px", color: "#424242" }}>
            Unleash your creativity! Share your blogs, newsletters, and vlogs on our platform and connect with a supportive community. Sign up now to amplify your voice and inspire others. Your journey starts here!
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
              Sign Up
            </button>
          </Link>

        </div>
        <div className="col-3 mt-5"></div>
      </div>
    </div>
  );
}

export default OpenAccount;
