import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserSearchBar.css';

export default function UserSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchUsers(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchUsers = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://tasya.onrender.com/api/users/search?q=${searchQuery}`);
      setResults(res.data);
      setIsOpen(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-search-container" ref={dropdownRef}>
      <span className="material-icons user-search-icon">search</span>
      <input
        type="text"
        className="user-search-input"
        placeholder="Search users..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!isOpen && e.target.value.trim()) setIsOpen(true);
        }}
        onFocus={() => {
          if (query.trim() && results.length > 0) setIsOpen(true);
        }}
      />

      {isOpen && query.trim() && (
        <div className="user-search-dropdown">
          {loading ? (
            <div className="user-search-empty">Searching...</div>
          ) : results.length > 0 ? (
            results.map((user) => (
              <Link 
                to={`/profile/${user.username}`} 
                key={user._id} 
                className="user-search-item"
                onClick={() => {
                  setIsOpen(false);
                  setQuery(''); // Optional: clear query after selection
                }}
              >
                {user.profileImage?.url ? (
                  <img src={user.profileImage.url} alt={user.username} className="user-search-avatar" />
                ) : (
                  <span className="material-icons user-search-avatar" style={{ fontSize: "40px", color: "#ccc" }}>account_circle</span>
                )}
                <div className="user-search-details">
                  <span className="user-search-username">{user.username}</span>
                  <span className="user-search-followers">
                    {user.followers?.length || 0} followers
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="user-search-empty">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}
