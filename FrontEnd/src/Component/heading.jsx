import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope,FaAddressCard,FaAddressBook } from 'react-icons/fa';
import { FcRating } from "react-icons/fc";
import '../Styles/heading.css'; // Import CSS

const Heading = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="navbar"
    >
      <h1 className="navbar-title">Workspace Finder</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/home" className="navbar-link">
            <FaHome className="navbar-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/contactus" className="navbar-link">
            <FaEnvelope className="navbar-icon" />
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/rateus" className="navbar-link">
            <FcRating className="navbar-icon" />
            Rate Us
          </Link>
        </li>
        <li>
          <Link to="/addWorkSpace" className="navbar-link">
            <FaAddressBook className="navbar-icon" />
            Add WorkSpace
          </Link>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Heading;
