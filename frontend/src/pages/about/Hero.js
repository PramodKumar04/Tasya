import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row mt-5 p-5" style={{ textAlign: "center" }}>
        <div className="col-3"></div>
        <div className="col-6">
            <h1>
            Our Story
            </h1>
            <p className="mt-3" style={{ fontSize: "1.2rem" }}>
            Welcome to Tasya - where ideas ignite! Our story began with a
            simple belief: creativity is the heartbeat of innovation. Tasya
            was born as a space to share, explore, and celebrate original ideas
            across design, technology, storytelling, and everyday inspiration.
            Whether you're an artist, a thinker, or a dreamer, our blog is your
            companion in the creative journey. Our vision is to build a vibrant
            community where curious minds can learn, express, and grow together —
            one idea at a time.
            </p>
        </div>
        <div className="col-3"></div>
      </div>
      <div className="row mt-5 p-5" style={{ textAlign: "center" }}>
        <div className="col-3"></div>
        <div className="col-6">
            <h1>Our Vision</h1>
            <p className="mt-3" style={{ fontSize: "1.2rem" }}>
            To become a leading platform that nurtures creativity, empowers
            self-expression, and inspires a global community of thinkers, makers,
            and storytellers. At Tasya, we envision a world where every
            idea is valued, every voice is heard, and creativity drives meaningful
            change.
            </p>
        </div>
        <div className="col-3"></div>   

      </div>
    </div>
  );
}

export default Hero;
