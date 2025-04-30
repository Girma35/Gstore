"use client";

import React, { useState } from "react";
import style from "./footer.module.css";
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), {
  ssr: false,
});

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handle the subscription action
  const handleSubscribe = () => {
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("Thank you for subscribing!");
    
    setEmail("");
  };

  return (
    <footer id={style.footer}>
      {/* Left Section */}
      <div className={style.leftFooter}>
        <h4>Get New Updates</h4>
        <div className={style.subscribe_container}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your Email*"
            className="p-2 border rounded-md"
          />
          <button
            onClick={handleSubscribe}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Subscribe
          </button>
        </div>
        {message && <p className="text-green-500 mt-2">{message}</p>}
        <p>Stay informed with our latest news and exclusive content.</p>
      </div>

      {/* Mid Section */}
      <div className={style.midFooter}>
        <h1>GSTORE</h1>
        <p>Ethiopia&apos;s Leading Ecommerce Platform</p>
        <p>© {new Date().getFullYear()} GStore. All Rights Reserved.</p>
        <h4>Follow Us</h4>
        <div className={style.social_icons}>
          <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/Girma35" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className={style.rightFooter}>
        <h4>Our Location</h4>
        <div id="map" style={{ width: "100%", height: "50%" }}>
          <Map />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
