import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./signup/AuthContext"; 

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, setUser, fetchUser } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <div className="container-fluid" style={{ fontSize: "1.2rem" }}>
      <nav
        className={`navbar fixed-top navbar-expand-md shadow-sm ${
          scrolled ? "bg-light" : "bg-transparent"
        }`}
        style={{
          borderBottom: scrolled ? "1px solid #ddd" : "none",
          zIndex: 1030,
          transition: "background-color 0.4s ease, border-bottom 0.4s ease",
        }}
      >
        <div className="container p-2">
          <Link className="navbar-brand" to="/">
            <img src="media/tasya.png" alt="logo" style={{ width: "80px" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/team">Team</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/plus">Plus</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/support">Support</Link>
              </li>

              {user ? (
                <>
                  <li className="nav-item">
                   <Link className="nav-link" to="/profile">
                      Welcome {user.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link  "
                      onClick={handleLogout}
                      style={{ color:"black", border: "none", background: "none" }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Login / Signup
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
