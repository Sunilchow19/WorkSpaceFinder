import React, { useState } from 'react';
import '../Styles/contact.css';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send form data to the backend
      const response = await axios.post('https://workspacefinder.onrender.com/send-email', formData);
  
      if (response.data.success) {
        console.log('Email sent successfully');
        // Reset form and show the popup
        setFormData({ name: '', email: '', message: '' });
        setShowPopup(true);
      } else {
        console.error('Failed to send email:', response.data.message);
      }
    } catch (error) {
      console.error('Error while sending email:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p>
              Thank you for contacting us! We will get back to you shortly. 😊
            </p>
            <button className="close-popup-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
