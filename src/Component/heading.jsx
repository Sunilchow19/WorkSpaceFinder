// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FaHome, FaEnvelope } from 'react-icons/fa'; // Import icons
// import { FcRating } from "react-icons/fc";

// const Heading = () => {
//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="navbar"
//     >
//       <h1>Workspace Finder</h1>
//       <ul>
//         <li>
//           <Link to="/home">
//             <FaHome style={{ marginRight: '8px' }} />
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/contactus">
//             <FaEnvelope style={{ marginRight: '8px' }} />
//             Contact Us
//           </Link>
//         </li>
//         <li>
//           <Link to="/rateus">
//             <FcRating style={{ marginRight: '8px' }} />
//             Rate Us
//           </Link>
//         </li>
//       </ul>
//     </motion.nav>
//   );
// };

// export default Heading;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope } from 'react-icons/fa';
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
      </ul>
    </motion.nav>
  );
};

export default Heading;
