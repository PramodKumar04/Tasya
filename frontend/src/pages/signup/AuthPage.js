import React, { useState, useEffect } from "react";
import "./AuthPage.css";
import NavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useAuth(); 

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

  const handleChangeLogin = (event) => {
    setLoginForm((newUser) => ({
      ...newUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/signup",
      signupForm,
      { withCredentials: true }
    );

    toast.success(response.data.message || "Signup successful!");

    setUser(response.data.user || { username: signupForm.username });

    navigate("/home");

    setSignupForm({ username: "", email: "", password: "" });
    document.querySelector("form.needs-validation.signup")?.reset();
  } catch (err) {
    console.error("Failed to register:", err);
    toast.error(err.response?.data?.message || "Signup failed");
  }
};


  const handleLoginSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      loginForm,
      { withCredentials: true }
    );

    toast.success(response.data.message || "Login successful!");

    setUser(response.data.user || { username: loginForm.username });

    setLoginForm({ username: "", password: "" });
    navigate("/home");
  } catch (err) {
    console.error("Failed to login:", err);
    toast.error(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="container-fluid mt-6">
      <NavBar />
      {/* 🔽 all below kept untouched */}
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh", marginTop: "5rem" }}
      >
        <div className={`contain ${isSignup ? "active" : ""}`}>
          {/* Login Box */}
          <div className="loginbox">
            <form
              noValidate
              className="needs-validation"
              onSubmit={handleLoginSubmit}
            >
              <h1 id="btn-press">Login</h1>
              <div className="inputbox">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={loginForm.username}
                  className="form-control"
                  onChange={handleChangeLogin}
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
                  name="password"
                  value={loginForm.password}
                  className="form-control"
                  onChange={handleChangeLogin}
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
            <form
              noValidate
              className="needs-validation signup"
              onSubmit={handleSubmit}
            >
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
