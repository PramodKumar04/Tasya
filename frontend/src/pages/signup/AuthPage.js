import React, { useState, useEffect } from "react";
import "./AuthPage.css";
import NavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

  const handleChange = (event) => {
    setSignupForm((newUser) => ({
      ...newUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/signup",
      signupForm
    );

    alert(response.data.message);
    navigate("/home");

    // Reset form
    setSignupForm({ username: "", email: "", password: "" });
    document.querySelector("form.needs-validation.signup").reset();
  } catch (err) {
    console.error("Failed to register:", err);
    alert(`Failed to register: 
      ${err.response?.data?.message || err.message}`);
  }
};


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
            <form noValidate className="needs-validation" onSubmit={handleSubmit}>
              <h1 id="btn-press">Sign-up</h1>
              <div className="inputbox">
                <input
                  type="text"
                  name="username"
                  value={signupForm.username}
                  onChange={handleChange}
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
                  name="email"
                  value={signupForm.email}
                  onChange={handleChange}
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
                  name="password"
                  value={signupForm.password}
                  onChange={handleChange}
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
