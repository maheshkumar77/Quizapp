// Footer.js
import React from "react";
import "../style/foter.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-cont">
        <div className="footer-l">
          <h3>QuizApp</h3>
          <p>&copy; 2025 QuizApp. All Rights Reserved.</p>
        </div>

        <div className="footer-m">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-r">
          <p>Follow us on:</p>
          <ul className="social-link">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
