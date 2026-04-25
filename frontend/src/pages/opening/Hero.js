import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Blogs", "Newsletters", "Vlogs", "Reviews", "And","Many..."],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy(); // Cleanup
  }, []);

  // Common heading style
  const headingStyle = {
    fontSize: "clamp(1.8rem, 5vw, 2.5rem)", // Responsive font size
    color: "#333",
    fontFamily: "Tagesschrift",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // subtle shadow
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center p-5"
      style={{ background: "linear-gradient(to right, #fdfbfb, #ebedee)" }}
    >
      <div className="row mt-5 p-md-5 p-2 w-100">
        <div className="col-12 col-lg-5 d-flex flex-column justify-content-center align-items-lg-start align-items-center p-md-5 p-3 text-lg-start text-center">
          {["Explore.", "Unleash.", "Create."].map((text, index) => (
            <h1 key={index} className="fw-bold mb-4" style={headingStyle}>
              <b>{text}</b>
            </h1>
          ))}

          <h1 className="fw-bold mb-4 d-flex align-items-center justify-content-lg-start justify-content-center" style={headingStyle}>
            <b>Upload&nbsp;</b>
            <span
              ref={typedRef}
              style={{
                color: "#6C5CE7",
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                whiteSpace: "pre",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            />
          </h1>

          <h1 className="fw-bold mb-4 d-flex align-items-center justify-content-lg-start justify-content-center" style={headingStyle}>
            <b>Connect.</b>
          </h1>
        </div>

        <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center mt-lg-0 mt-5">
          <img
            src="media/openingimage.png"
            alt="Hero"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
