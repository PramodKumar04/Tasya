import React from "react";

function Footer() {
  return (
    <footer style={{ background: "#FBFBFB" }}>
      <div className="container border-top">
        <div className="row mt-4 p-4">
          <div className="col-6">
            <img
              src="media/new-Photoroom.png"
              alt="logo"
              style={{ width: "28%" }}
            />
            <p className="mt-3 mb-1" style={{ fontSize: "20px" }}>
              © 2025 - 2028, Creative Hub Ltd.
            </p>
            <p className="mt-1" style={{ fontSize: "15px" }}>
              All rights reserved.
            </p>
            <p
              style={{
                color: "#555",
                fontSize: "24px",
                display: "flex",
                gap: "20px",
              }}
            >
              <a href="#" style={{ color: "#555" }}>
                <i class="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" style={{ color: "#555" }}>
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" style={{ color: "#555" }}>
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" style={{ color: "#555" }}>
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </p>
            <hr />
            <p
              style={{
                color: "#555",
                fontSize: "24px",
                display: "flex",
                gap: "20px",
              }}
            >
              <a href="#" style={{ color: "#555" }}>
                <i class="fa-brands fa-youtube"></i>
              </a>
              <a href="#" style={{ color: "#555" }}>
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <a href="#" style={{ color: "#555" }}>
                <i class="fa-brands fa-telegram"></i>
              </a>
            </p>
          </div>
          <div className="col-2"></div>

          <div className="col-4">
            <h3 className="mb-5" style={{ fontSize: "30px" }}>
              Made with ❤️ in Hyderabad
            </h3>
            <p style={{ fontSize: "17px" }}>
              Driven by creativity and curiosity, we craft innovative ideas and
              solutions that aim to inspire, inform, and make a real difference
              in the world. Join us on this journey of stories, insights, and
              impact!
            </p>
          </div>
        </div>
        <div className="container py-4">
          <h4 className="row mb-3">Terms and Conditions</h4>
          <ul style={{ lineHeight: "1.8" ,fontSize: "15px"}}>
            <li>
              <strong>Content Ownership:</strong> All blog posts, images, and
              materials published on this site are owned by the site owner
              unless otherwise stated. Unauthorized use or duplication is
              prohibited.
            </li>
            <li>
              <strong>User Conduct:</strong> Users must not engage in any
              activity that disrupts or interferes with the website’s
              functionality, security, or integrity. Comments and interactions
              must remain respectful and lawful.
            </li>
            <li>
              <strong>External Links:</strong> This website may contain links to
              external websites. We are not responsible for the content or
              practices of those sites.
            </li>
            <li>
              <strong>Disclaimer:</strong> All content is for informational
              purposes only and should not be considered professional advice. We
              do not guarantee the accuracy, completeness, or reliability of any
              information.
            </li>
            <li>
              <strong>Changes to Terms:</strong> We reserve the right to modify
              these terms at any time. Continued use of the site means you
              accept any changes made.
            </li>
            <li>
              <strong>Privacy:</strong> We value your privacy. Please refer to
              our <a href="/privacy-policy">Privacy Policy</a> for information
              on how data is collected and used.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
