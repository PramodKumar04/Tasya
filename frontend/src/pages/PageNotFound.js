import React from "react";

function PageNotFound() {
  return (
    <div className="container mb-4">
      <div className="row text-center mt-5">
        <div className="text-center">
          <img
            src="media/404notfound.png"
            alt="404"
            className="img-fluid"
            style={{ width: "30%" }}
          />
        </div>

        <h1 className="mt-5 " style={{ color: "#424242", fontSize: "2.5rem" }}>
          404 - Page Not Found
        </h1>
        <p className="mt-4 mb-4" style={{ color: "#424242", fontSize: "17px" }}>
          Sorry, the page you are looking for does not exist. It might have been
          removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
