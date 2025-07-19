import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
const [user, setUser]= useState(null);
const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const getSessionInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/session-info", {
        withCredentials: true 
      });
      setUser(res.data.user); 
      console.log("Session user:", res.data.user);
    } catch (err) {
      console.error("User not found , Unable to fetch:", err);
    }
  };

  getSessionInfo();
}, []);

    

    

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/logout", {
        withCredentials: true
      });

      console.log(res.data.message);
      setUser(null);         // Clear user from frontend state
      navigate("/");         // Redirect to home
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="container-fluid" style={{ fontSize: "1.2rem" }}>
      <nav
        className={`navbar fixed-top navbar-expand-md shadow-sm ${scrolled ? "bg-light" : "bg-transparent"}`}
        style={{
          borderBottom: scrolled ? "1px solid #ddd" : "none",
          zIndex: 1030,
          transition: "background-color 0.4s ease, border-bottom 0.4s ease"
        }}
      >
        <div className="container p-2">
          <Link className="navbar-brand" to="/">
            <img src="media/tasya.png" alt="logo" style={{ width: "70px" }} />
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ paddingLeft: '40rem' }}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" to="/home">Home</Link></li>
              <li className="nav-item"><Link className="nav-link active" to="/team">Team</Link></li>
              <li className="nav-item"><Link className="nav-link active" to="/plus">Plus</Link></li>
              <li className="nav-item"><Link className="nav-link active" to="/support">Support</Link></li>
{!user && ( <li className="nav-item"><Link className="nav-link active" to="/signup">Login/Signup</Link></li>)}
             {user && ( <li className="nav-item"><Link onClick={handleLogout} className="nav-link active" to="/">Logout</Link></li>)}
             
            </ul>
          </div>
        </div>
      </nav>

      {/* Spacer below navbar */}
      <div style={{ marginBottom: "20px" }}></div>
    </div>
  );
}

export default NavBar;
