import "./HomePage.css";
import React, { useEffect, useState } from "react";
import api from "../../api";

export default function Hero() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts")
      .then(res => {
        console.log("Posts fetched successfully:", res.data);
        setPosts(res.data);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
      });
  }, []);
  
  const sortedPosts = posts.sort((a, b) => b.likes - a.likes);
  const images = sortedPosts.slice(0, 3).map((posts) => posts.image.url);

  return (
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner shadow-lg rounded-4">
        <div class="carousel-item active">
          <img src={images[0]} className="d-block w-100"  style={{ height: '600px', objectFit: 'cover' }} alt="image-1" />
          <div className="carousel-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8))' }}></div>
          <div class="carousel-caption d-none d-md-block text-start" style={{ bottom: '40px', left: '40px' }}>
            <span className="badge bg-primary mb-2">#Trending 1</span>
            <h2 className="fw-bold display-4">Discover the Spark</h2>
            <p className="lead">Join a community of creators igniting new ideas.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src={images[1]} class="d-block w-100"  style={{ height: '600px', objectFit: 'cover' }} alt="image-2" />
          <div className="carousel-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8))' }}></div>
          <div class="carousel-caption d-none d-md-block text-start" style={{ bottom: '40px', left: '40px' }}>
            <span className="badge bg-success mb-2">#Trending 2</span>
            <h2 className="fw-bold display-4">Write Your Story</h2>
            <p className="lead">Your voice matters. Let the world hear it with Tasya.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src={images[2]} className="d-block w-100"  style={{ height: '600px', objectFit: 'cover' }} alt="img-3" />
          <div className="carousel-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8))' }}></div>
          <div class="carousel-caption d-none d-md-block text-start" style={{ bottom: '40px', left: '40px' }}>
            <span className="badge bg-info mb-2">#Trending 3</span>
            <h2 className="fw-bold display-4">Connect with Minds</h2>
            <p className="lead">Follow your favorite authors and grow together.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
