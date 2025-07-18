import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddNewPost() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
  });

 const [fileInp, setFileInp] = useState({ image: null, video: null });

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
    setPostData((currPost) => ({
      ...currPost,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    const {name , files} = event.target;
    setFileInp( (currinp)=>({
      ...currinp , [name]:files[0]
  }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("category", postData.category);
    formData.append("image", fileInp.image);
     formData.append("video", fileInp.video);
   
    

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post created successfully!");
      navigate("/home");

      // Reset form
      setPostData({ title: "", content: "", category: "" });
      setFileInp({image :null , video: null});
      document.querySelector("form").reset();
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Something went wrong. Check the console for details.");
    }
  };

  return (
    <div className="row">
      <div
        className="col col-lg-8 col-md-10 col-sm-12 offset-2 offset-lg-2 offset-md-1"
        style={{ marginTop: "6rem" }}
      >
        <h2>
          <b>Unleash Your Creativity</b>
        </h2>
        <br />
        <form onSubmit={handleSubmit} noValidate className="needs-validation">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
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
            <div className="invalid-feedback">Please enter your valid title</div>
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              width="100%"
              rows={10}
              name="content"
              id="content"
              value={postData.content}
              onChange={handleChange}
              placeholder="Write your content..."
              required
            />
            <div className="invalid-feedback">
              Please add something to your post
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              name="category"
              id="category"
              value={postData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="blog">Blogs</option>
              <option value="vlogs">Vlogs</option>
              <option value="art">Art</option>
              <option value="newsletter">Newsletter</option>
              <option value="review">Reviews</option>
              <option value="other">Other</option>
            </select>
            <div className="invalid-feedback">Please select a category</div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              className="form-control"
              name="image"
              id="image"
              onChange={handleFileChange}
             
            />
            <div className="form-text">Optional: Upload an image for your post</div>
          </div>

          <div className="mb-3">
            <label htmlFor="video" className="form-label">
              Upload Video
            </label>
            <input
              type="file"
              className="form-control"
              name="video"
              id="video"
              onChange={handleFileChange}
             
            />
            <div className="form-text">Optional: Upload video for your post</div>
          </div>

          <button type="submit" className="btn btn-primary mt-5 mb-5">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
