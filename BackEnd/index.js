const express = require('express');
const mongoose = require('mongoose');
const Workspace = require('./server'); // Assuming Workspace schema is in server.js
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv=require('dotenv')

dotenv.config()

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.Connection_String, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create uploads directory if not exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Add a new workspace with image upload
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to create a new workspace
app.post('/api/newWorkspaces', upload.array('images', 5), async (req, res) => {
  try {
    const {
      title, description, price,
      city, locationName, location,
      latitude, longitude, sqft
    } = req.body;

    // Generate full URLs for the uploaded images
    const imagePaths = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);

    // Create a new workspace document
    const workspace = new Workspace({
      title,
      description,
      price,
      city,
      locationName,
      location,
      latitude,
      longitude,
      sqft,
      images: imagePaths, // Array of full URLs
    });

    // Save the document to the database
    await workspace.save();
    res.status(201).json({ message: 'Workspace added successfully', workspace });
  } catch (err) {
    res.status(400).json({ message: 'Error adding workspace', error: err.message });
  }
});


// Get all workspaces
app.get('/api/workspaces', async (req, res) => {
  try {
    const workspaces = await Workspace.find();
    res.status(200).json(workspaces);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workspaces' });
  }
});

// Get a single workspace by ID
app.get('/api/workspaces/:id', async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workspace' });
  }
});

// Static route to serve uploaded images
app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filePath);
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure the Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
      user: 'www.sunilchowdhary19@gmail.com', // Replace with your email
      pass: 'oeke icay flxr zvgt', // Replace with your email password or app-specific password
    },
  });

  // Mail options
  const mailOptions = {
    from: email, // User's email
    to: 'www.sunilchowdhary19@gmail.com', // Your email
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Failed to send email.' });
  }
});


app.post('/send-feedback', async (req, res) => {
  const { rating, feedback,email } = req.body;

  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider
    auth: {
      user: 'www.sunilchowdhary19@gmail.com', // Replace with your email
      pass: 'oeke icay flxr zvgt', // Replace with your email password or app-specific password
    },
  });

  // Mail options
  const mailOptions = {
    from: email, // Your email
    to: 'www.sunilchowdhary19@gmail.com', // Owner's email
    subject: `New Rating and Feedback Received`,
    text: `
      New feedback received:
      Rating: ${rating}
      Email:${email}
      Feedback: ${feedback ? feedback : 'No additional feedback provided.'}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).send({ success: false, message: 'Failed to send feedback.' });
  }
});

// Listen on port
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
