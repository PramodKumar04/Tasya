import React from "react";

function Support() {
  return (
    <div className="container mt-5 p-5">
      <div className="mb-5 p-5">
        <h4 className=" mb-4 fw-bold"  style={{color:"#6C5CE7"}}>Frequently Asked Questions (FAQ'S)</h4>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                How do I publish a blog?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Go to your dashboard, click on "New Post", write your content, and hit publish.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                How do I join the Plus membership?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Visit the plus section and click on "Join Plus Now". Complete the payment to activate your membership.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                I lost my login access. What do I do?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Use the "Forgot Password" link on the login page to reset your password.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 p-5">
        <h4 className="fw-semibold mb-3" style={{color:"#6C5CE7"}}>Need More Help?</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea className="form-control" id="message" rows="5" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{backgroundColor:"#6C5CE7"}}>Submit</button>
        </form>
      </div>
      <div className="text-center mt-4">
        <p className="mb-1" style={{fontSize:"1.5rem"}}>Still need help? Email us at <a href="mailto:support@yourblog.com">support@creativehub.com</a></p>
        <p className="mt-2" style={{fontSize:"1rem"}}>Follow us on<a href="#" target="_blank" rel="noopener noreferrer" style={{color: "black", fontSize: "22px",padding:"10px " }}><i class="fa-brands fa-instagram"></i></a>   <a href="#" target="_blank" rel="noopener noreferrer" style={{color: "black", fontSize: "22px" }}><i class="fa-brands fa-x-twitter"></i></a></p>
      </div>
    </div>
  );
}

export default Support;
