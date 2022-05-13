import React from "react";
import "./Newsletter.css";
const Newsletter = () => {
  return (
    <div className="newsletter">
      <div className="container">
        <h1 className="large-heading">
          Subscribe to our newsletter and get exclusive benefits !
        </h1>
        <div className="inputBox">
          <input type="text" placeholder="Enter your email" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
