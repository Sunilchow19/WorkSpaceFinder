// models/Workspace.js

const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],  // Array of image URLs
  price: { type: Number, required: true },
  city: { type: String, required: true },
  locationName: { type: String },
  sqft:{type : String},
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const Workspace = mongoose.model('users', workspaceSchema);

module.exports = Workspace;
