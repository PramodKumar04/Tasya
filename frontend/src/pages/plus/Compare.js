import React from "react";

function Compare() {
  return (
    <div className="container mb-5">
      <h2 className="text-center mb-4">Compare Plans</h2>
      <div className="row justify-content-center g-4">
        <div className="col-md-5">
          <div className="card shadow-sm border">
            <div className="card-body text-center">
              <h4 className="card-title fw-bold mb-3">Normal</h4>
              <h5 className="text-muted mb-4">Free</h5>
              <ul className="list-unstyled text-start px-4">
                <li className="mb-2">
                  <span style={{ color: "green" }}>✓</span> Write and publish
                  blogs
                </li>
                <li className="mb-2">
                  <span style={{ color: "red" }}>✕</span> Boosted visibility
                </li>
                <li className="mb-2">
                  <span style={{ color: "red" }}>✕</span> Promotional support
                </li>
                <li className="mb-2">
                  <span style={{ color: "red" }}>✕</span> AI writing assistant
                </li>
                <li className="mb-2">
                  <span style={{ color: "red" }}>✕</span> Verified badge
                </li>
                <li className="mb-2">
                  <span style={{ color: "red" }}>✕</span> Full community access
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card shadow border-primary">
            <div className="card-body text-center">
              <h4 className="card-title fw-bold mb-3 text-primary">Plus</h4>
              <h5 className="text-muted mb-4">₹299/year</h5>
              <ul className="list-unstyled text-start px-4">
                <li className="mb-2">
                  <span style={{ color: "green" }}>✓</span> Write and publish
                  blogs
                </li>
                <li className="mb-2">
                  <span style={{ color: "green" }}>✓</span> Boosted visibility
                </li>
                <li className="mb-2">
                  <span style={{ color: "green" }}>✓</span> Promotional support
                </li>
                <li className="mb-2">
                  <span style={{ color: "green" }}>✓</span> AI help for writing
                  blogs
                </li>
                <li className="mb-2">
                  <span style={{ color: "green" }}>✓</span> Verified badge
                </li>
                <li className="mb-2">
                  <span style={{ color: "green" }}>✓</span> Full community
                  access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
