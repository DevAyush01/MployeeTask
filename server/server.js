const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const dbConnect = require('./config/dbConnect');
const jobRoutes = require('./routes/jobRoutes');

// Enable CORS for all domains
app.use(cors());

// Middleware
app.use(express.json());

// db Connect
dbConnect();

// API routes
app.use('/api', jobRoutes);

// Set up the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
