import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
export default function AddNewPost() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: ""
  });
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    
    setPostData((currPost) => ({ ...currPost, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/posts", postData);
       navigate("/home");
      alert("Post created successfully!");
//empty the form 
      setPostData({ title: "", content: "", category: "" });
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Something went wrong. Check the console for details.");
    }
  };

  return (
    <div className="row">
      <div className="col col-8 offset-2 mt-4 ">
        <h2><b>Create a New Post</b></h2>
        <br />
        <form onSubmit={handleSubmit} noValidate className="needs-validation">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              className="form-control"
              name="content"
              id="content"
              value={postData.content}
              onChange={handleChange}
              placeholder="Write your content..."
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              className="form-control"
              name="category"
              list="datalistOptions"
              id="category"
              placeholder="Type to search..."
              value={postData.category}
              onChange={handleChange}
            />
            <datalist id="datalistOptions">
              <option value="blog" />
              <option value="vlogs" />
              <option value="art" />
              <option value="newsletter" />
              <option value="other" />
            </datalist>
          </div>

          <button type="submit" className="btn btn-dark">Add</button>
        </form>
      </div>
    </div>
  );
}
