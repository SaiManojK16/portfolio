require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sendEmail } = require('./mail');

const app = express();
const port = process.env.PORT || 3008;

// Enable CORS for development
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use('/portfolio/images', express.static(path.join(__dirname, '../public/images')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Email endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Contact API route hit');
  
  try {
    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Invalid form data',
        errors: [
          !name && { field: 'name', message: 'Name is required' },
          !email && { field: 'email', message: 'Email is required' },
          !message && { field: 'message', message: 'Message is required' }
        ].filter(Boolean)
      });
    }

    // Send email
    const result = await sendEmail({ name, email, message });
    console.log('Email sent result:', result);
    
    res.status(200).json({
      message: 'Email sent successfully',
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to send email'
    });
  }
});

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Start server
app.listen(port, () => {
  console.log(`API Server running at http://localhost:${port}`);
}); 