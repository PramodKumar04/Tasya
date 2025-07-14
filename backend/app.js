const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./routes/Posts');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tasya')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Error:", err));

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/plus', (req, res) => {
  res.send('Welcome to Tasya API!');
});

// Routes
app.use('/api/posts', postRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
