import React from "react";

function Hero() {
  return (
    <div className="container p-5 mt-5">
      <div className="row mt-5" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem" }}>The Plus Community</h1>
        <p style={{ fontSize: "1.5rem" }}>
          Join the <strong>Plus Community</strong> at ₹299/year
        </p>
      </div>
      <div className="row p-5 mt-5">
        <h3 className="fw-bold mb-4 text-start">
          Why Join the <b style={{fontWeight:"bold",color:"#6C5CE7"}}>Plus</b> Community?
        </h3>
        <ul style={{ fontSize: "17px"}} className="text-start">
          <li className="mb-3">
            <strong>Exclusive Content</strong> – Access premium blogs, vlogs,
            newsletters, and expert insights not available to free users.
          </li>
          <li className="mb-3">
            <strong>Ad-Free Experience</strong> – Enjoy seamless browsing
            without any interruptions.
          </li>
          <li className="mb-3">
            <strong>Early Access</strong> – Be the first to try new features,
            content drops, and events.
          </li>
          <li className="mb-3">
            <strong>Priority Support</strong> – Receive fast, personalized
            assistance when you need it.
          </li>
          <li className="mb-3">
            <strong>Community Perks</strong> – Join members-only forums,
            AMAs, and collaborate with top creators.
          </li>
          <li className="mb-3">
            <strong>AI Blog Assistant</strong> – Get help from AI for writing
            blogs — outlines, ideas, editing, and grammar suggestions.
          </li>
          <li className="mb-3">
            <strong>Verified Badge</strong> – Stand out with a verified badge
            to build trust and credibility.
          </li>
          <li className="mb-3">
            <strong>Boosted Visibility</strong> – Reach a wider audience
            through prioritized placement and platform promotion.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Hero;
