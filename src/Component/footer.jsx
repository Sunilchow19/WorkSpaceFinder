import React from 'react';
import './footer.css'; // Custom CSS file for styling
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h1 className="footer-title">WORKSPACES FINDER</h1>

        <div className="footer-sections">
          <div className="section">
            <h3>About Us</h3>
            <p>Your go-to platform for booking temporary workspaces in cafes and co-working spaces.</p>
          </div>

          <div className="section">
            <h3>Quick Links</h3>
            <ul>

              <li><Link to="/home">Home</Link></li>
              <li><Link to="/contactus">Contact</Link></li>
              <li><Link to="/rateus">Rateus</Link></li>
              <li><a href="#book-now">📞 Book Now</a></li>
            </ul>
          </div>

          <div className="section">
            <h3>Address</h3>
            <p>Workspace Finder HQ,KPHB, Hyderabad, India</p>
          </div>

          <div className="section">
            <h3>Connect Us</h3>
            <p>📞 1234567890</p>
            <p>📧 hello@workspacefinder.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
