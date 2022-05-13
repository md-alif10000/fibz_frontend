import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (
    <div className="aboutSection">
      <div className="about_container">
        <h1>About US</h1>
        <p>
          We are perfectionists who strive to live up to our Premium Brand
          Repute. We deal only in Premium quality and would keep our Premium
          Client Base satisfied. While we may be new to the EU, our Top
          Management has a collective 150+ years of expertise in the Textile,
          Garment, and Sports Industries. We won’t say we are the best, we
          believe if you try our only one T-Shirt you will be hooked to our
          Brand. Because we know what actual Premium Brand feels like. Simply
          test our T-shirt and you'll never need to look for another t-shirt
          Brand again.
        </p>

        <p>
          For the time being, we're currently dealing with T-shirts only because we want them to be flawless. We're about to take off. All of our textile items will be sold under our Premium Brand name in the Premium Quality Only. We will accommodate customized orders for Our Premium Customers in the future.
        </p>


        <p>We do not believe in purchasing raw material as clothes, we manufacture our own fabric of Premium Quality. We do not compromise while dealing with Premium in any domain. Our Backyard of production is based in Pakistan and we would do anything to stand by our slogan. We know what we are doing and we know how it should be done. We are pioneer of Premium Quality in our own unique way. If you deal with us, you don’t have to look for Premium goods anywhere else.</p>
      </div>
    </div>
  );
};

export default About;
