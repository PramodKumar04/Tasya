import React from "react";
import {Link} from 'react-router-dom';

function Journey() {
  return (
    <div className="container mt-5 p-5 mb-5">
      <div className="row">
        <div className="col-5 p-3">
          <h1 className="mt-4" style={{ fontStyle: "15px" }}>
            Start your creative journey
          </h1>
          <hr
            style={{
              height: "3px",
              backgroundColor: "#6f42c1",
              border: "none",
              borderRadius: "2px",
              margin: "2rem 0",
            }}
          />
          <br />
          <p className="mt-1" style={{ fontSize: "20px" }}>
            Discover a space where creativity thrives and connections flourish.
            Our platform makes it easy to share your work, gain visibility, and
            build a dedicated following. With intuitive tools and a supportive
            community, you'll find everything you need to grow your creative
            presence.
          </p>
          
          <Link to="/signup">
            <button
              className="btn btn-primary mt-5"
              style={{
                width: "30%",
                fontSize: "20px",
                backgroundColor: "#6C5CE7",
              }}
            >
              Get Started
            </button>
          </Link>
        </div>
        <div className="col-7 mt-3 p-4">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="media/landpage-1.jpg"
                  className="d-block w-100"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="media/landpage-2.jpg"
                  className="d-block w-100"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="media/landpage-3.jpg"
                  className="d-block w-100"
                  alt="First slide"
                />
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journey;
