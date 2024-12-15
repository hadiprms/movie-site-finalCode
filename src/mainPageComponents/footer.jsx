import React from 'react';  
import { Link } from 'react-router-dom';
import './cssFiles/footer.css';
import 'react-loading-skeleton/dist/skeleton.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/rules" className="footer-link">Rules</Link>
        <span>|</span>
        <Link to="/contact" className="footer-link">Contact Us</Link>
        <span>|</span>
        <Link to="/feedback" className="footer-link">Give Feedback</Link>
      </div>
      <p className="footer-text">© 2024 Best Movies. All rights reserved.</p>
    </footer>
  );
}

export default Footer;