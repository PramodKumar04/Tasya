import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../signup/AuthContext";
import "./AddButton.css";

export default function AddPostLink() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link to="/create" className="floating-button" title="Add Post">
      <i className="fa-solid fa-plus"></i>
    </Link>
  );
}
