import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/WorkspaceForm.css'; // Import the CSS file
import Heading from './heading';

const WorkspaceForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    locationName: '',
    location: '',
    latitude: '',
    longitude: '',
    sqft: ''
  });
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append image files
      Array.from(images).forEach((file) => {
        formDataToSend.append('images', file);
      });

      // Send the request to the back end
      const response = await axios.post('https://workspacefinder.onrender.com/api/newWorkspaces', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);

      // Reset form fields
      setFormData({
        title: '',
        description: '',
        price: '',
        city: '',
        locationName: '',
        location: '',
        latitude: '',
        longitude: '',
        sqft: ''
      });
      setImages([]); // Clear the selected images

      // Show success modal
      setShowModal(true);
    } catch (err) {
      console.error('Error adding workspace:', err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closePopup = () => {
    setPopup({ show: false, message: '', type: '' });
  };

  return (
  <>
  <Heading/>
    <div className="workspace-form-container">
      <h2>Add New Workspace</h2>
      <form onSubmit={handleSubmit} className="workspace-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            title="Add your Workspace Name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            title="Add your Workspace Description"
          />
        </div>
        <div className="form-group">
          <label>Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            required
            title="Add your Workspace Images (up to 5)"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            title="Add your Workspace Price"
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            title="Add your Workspace City Located"
          />
        </div>
        <div className="form-group">
          <label>Location Name</label>
          <input
            type="text"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
            title="Add your Workspace Location Name"
          />
        </div>
        <div className="form-group">
          <label>Location (Street Address)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            title="Add your Workspace Google Maps Exact Location"
          />
        </div>
        <div className="form-group">
          <label>Area Square Feet(sqft)</label>
          <input
            type="text"
            name="sqft"
            value={formData.sqft}
            onChange={handleChange}
            required
            title="Add your Workspace Area Square Feet"
          />
        </div>
        <div className="form-group">
          <label>Latitude</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            title="Add your Workspace Exact Latitude"
          />
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            title="Add your Workspace Exact Longitude"
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Success!</h3>
            <p>The workspace has been added successfully.</p>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default WorkspaceForm;
