import React, { useState, useEffect } from "react";
import "./AuthPage.css";
import NavBar from "../NavBar";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  return (
    <div className="container-fluid mt-6">
      <NavBar />
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh", marginTop: "5rem" }}
      >
        <div className={`contain ${isSignup ? "active" : ""}`}>
          {/* Login Box */}
          <div className="loginbox">
            <form noValidate className="needs-validation">
              <h1 id="btn-press">Login</h1>
              <div className="inputbox">
                <input
                  type="email"
                  placeholder="Username"
                  className="form-control"
                  required
                />
                <i className="bx bxs-user"></i>
                <div className="invalid-feedback">
                  Please enter your Username
                </div>
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  required
                />
                <i className="bx bxs-key"></i>
                <div className="invalid-feedback">
                  Please enter your valid password
                </div>
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
            <form noValidate className="needs-validation">
              <h1 id="btn-press">Sign-up</h1>
              <div className="inputbox">
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your valid Username
                </div>
                <i className="bx bxs-user"></i>
              </div>
              <div className="inputbox">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your valid email
                </div>
                <i className="bx bx-envelope"></i>
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid password
                </div>
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
