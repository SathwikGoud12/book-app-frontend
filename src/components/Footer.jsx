import React from 'react';
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-container">
        {/* Left Side - Logo and Nav */}
        <div className="footer-left">
          <img src={footerLogo} alt="Logo" className="footer-logo" />
          <ul className="footer-nav">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="footer-newsletter">
          <p>Subscribe to our newsletter to receive the latest updates, news, and offers!</p>
          <div className="footer-input-container">
            <input
              type="email"
              placeholder="Enter your email"
              className="footer-input"
            />
            <button className="footer-button">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        {/* Left Side - Privacy Links */}
        <ul className="footer-privacy">
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms of Service</a></li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
