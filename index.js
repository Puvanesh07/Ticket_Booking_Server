const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173", // You can adjust this to your frontend's URL
}));

// Routes
app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
