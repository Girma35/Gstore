"use client";

import React, { useEffect } from "react";
import style from "./footer.module.css";

import Map from "./map";



const Footer = () => {

  

  return (
    <footer id={style.footer}>


   {/* left section  */}

      <div className={style.leftFooter}>
        <h4>Get New Updates</h4>
        <div className={style.subscribe_container}>
          <input type="email" placeholder="Enter your Email*" />
          <button>Subscribe</button>
        </div>
        <p>Stay informed with our latest news and exclusive content.</p>
      </div>

      {/* mid section  */}
      <div className={style.midFooter}>
        <h1>S.A APPAREL</h1>
        <p>Where Quality Meets Innovation.</p>
        <p>© 2023 Saadustu. All Rights Reserved.</p>
        <h4>Follow Us</h4>
        <div className={style.social_icons}>
          <a href="https://www.linkedin.com/in/saadamin662/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/saad662" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* right section  */}
      
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