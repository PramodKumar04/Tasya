import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../signup/AuthContext";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import api from "../../api";

export default function AddNewPost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [fileInp, setFileInp] = useState({ image: null, video: null });
  const [uploading, setUploading] = useState(false);
  const [improving, setImproving] = useState(false);

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

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
    const { name, files } = event.target;
    if (files[0]) {
      // Check file size (100MB limit)
      if (files[0].size > 100 * 1024 * 1024) {
        alert("File size should be less than 100MB");
        return;
      }

      // Check file type
      if (name === "image" && !files[0].type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      if (name === "video" && !files[0].type.startsWith("video/")) {
        alert("Please select a valid video file");
        return;
      }

      setFileInp((currinp) => ({
        ...currinp,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("category", postData.category);
    
    if (fileInp.image) {
      formData.append("image", fileInp.image);
    }
    
    if (fileInp.video) {
      formData.append("video", fileInp.video);
    }

    try {
      const response = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000, // 5 minutes timeout for large files
      });

      console.log("Post created successfully:", response.data);
      alert("Post created successfully!");
      navigate("/home");

      // Reset form
      setPostData({ title: "", content: "", category: "" });
      setFileInp({ image: null, video: null });
      document.querySelector("form").reset();
    } catch (err) {
      console.error("Failed to create post:", err);
      alert(`Failed to create post: 
        ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleAIAssist = async () => {
    if (!postData.content) return alert("Please write something first");
    setImproving(true);
    try {
      const res = await api.post("/ai/improve", {
        content: postData.content,
        title: postData.title
      });
      setPostData(prev => ({ ...prev, content: res.data.improvedContent }));
      alert("Content improved by Tasya AI!");
    } catch (err) {
      console.error("AI Assist failed:", err);
      alert("Failed to improve content.");
    } finally {
      setImproving(false);
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
            <div className="position-relative">
              <ReactQuill
                theme="snow"
                value={postData.content}
                onChange={(content) => setPostData((curr) => ({ ...curr, content }))}
                modules={modules}
                formats={formats}
                placeholder="Write your content..."
                style={{ height: '300px', marginBottom: '50px' }}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-primary position-absolute bottom-0 end-0 m-2 d-flex align-items-center gap-1"
                onClick={handleAIAssist}
                disabled={improving}
                title="AI Improve"
              >
                <span className="material-icons" style={{ fontSize: '18px' }}>auto_fix_high</span>
                {improving ? "Improving..." : "AI Assist"}
              </button>
            </div>
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
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="form-text">
              Optional: Upload an image for your post (Max 100MB)
              {fileInp.image && (
                <span className="text-success"> - {fileInp.image.name} selected</span>
              )}
            </div>
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
              accept="video/*"
              onChange={handleFileChange}
            />
            <div className="form-text">
              Optional: Upload video for your post (Max 100MB)
              {fileInp.video && (
                <span className="text-success"> - {fileInp.video.name} selected</span>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary mt-5 mb-5"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}
