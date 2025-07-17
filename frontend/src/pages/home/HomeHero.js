import "./HomePage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Hero() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
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
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={images[0]} className="d-block w-100"  style={{ height: '700px', objectFit: 'fill' }} alt="image-1" />
          <div class="carousel-caption d-none d-md-block">
            <h5>#Trending 1</h5>
            
          </div>
        </div>
        <div class="carousel-item">
          <img src={images[1]} class="d-block w-100"  style={{ height: '700px', objectFit: 'fill' }} alt="image-2" />
          <div class="carousel-caption d-none d-md-block">
            <h5>#Trending 2</h5>
            
          </div>
        </div>
        <div class="carousel-item">
          <img src={images[2]} className="d-block w-100"  style={{ height: '700px', objectFit: 'fill' }} alt="img-3" />
          <div class="carousel-caption d-none d-md-block">
            <h5>#Trending 3</h5>
            
          </div>
        </div>
      </div>
    </div>
  );
}
