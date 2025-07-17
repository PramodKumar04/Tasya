import React from "react";
import { Link } from "react-router-dom";
import "./AddButton.css";

export default function AddPostLink() {
  return (
    <Link to="/create" className="floating-button" title="Add Post">
      <i className="fa-solid fa-plus"></i>
    </Link>
  );
}
