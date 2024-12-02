import React from 'react';
import { motion } from 'framer-motion';
import Heading from './heading';
import "../Styles/homepage.css"

const HomePage = () => {
  return (
    <div>
      <Heading />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="homepage-content"
      >
        <h2>Find Your Ideal Workspace</h2>
        <p>Browse and book workspaces conveniently.</p>
      </motion.div>
    </div>
  );
};

export default HomePage;
