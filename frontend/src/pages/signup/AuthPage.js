import React, { useState } from "react";
import "./AuthPage.css"; // Import your CSS file for styling

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`contain ${isSignup ? "active" : ""}`}>
          {/* Login Box */}
          <div className="loginbox">
            <form>
              <h1 id="btn-press">Login</h1>
              <div className="inputbox">
                <input type="email" placeholder="Username" required />
                <i className="bx bxs-user"></i>
              </div>
              <div className="inputbox">
                <input type="password" placeholder="Password" required />
                <i className="bx bxs-key"></i>
              </div>
              <div className="forget-link">
                <a href="#" id="forgot">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
              <p>or login with social platforms</p>
              <div className="social_icons">
                <a href="#">
                  <i className="bx bxl-google"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-facebook-circle"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-twitter"></i>
                </a>
              </div>
            </form>
          </div>

          {/* Sign-up Box */}
          <div className="loginbox signupbox">
            <form>
              <h1 id="btn-press">Sign-up</h1>
              <div className="inputbox">
                <input type="text" placeholder="Username" required />
                <i className="bx bxs-user"></i>
              </div>
              <div className="inputbox">
                <input type="email" placeholder="Email" required />
                <i className="bx bx-envelope"></i>
              </div>
              <div className="inputbox">
                <input type="password" placeholder="Password" required />
                <i className="bx bxs-key"></i>
              </div>
              <button type="submit" className="btn">
                Register
              </button>
              <p>or Signup with socials</p>
              <div className="social_icons">
                <a href="#">
                  <i className="bx bxl-google"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-facebook-circle"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-twitter"></i>
                </a>
              </div>
            </form>
          </div>

          {/* Toggle Panel */}
          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button
                className="btn signup-btn"
                onClick={() => setIsSignup(true)}
              >
                Signup
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                className="btn login-btn"
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AuthPage;
