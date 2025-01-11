// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");

// Load environment variables from the .env file
dotenv.config();

// Connect to MongoDB using credentials from the environment file
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Serve static files from the "public/images" directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware to parse JSON payloads
app.use(express.json());

// Add security headers to API responses
app.use(helmet());

// Log API requests for monitoring and debugging
app.use(morgan("common"));

// Configure file upload handling with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Set destination for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // Save files with the provided name in the request body
  },
});

const upload = multer({ storage: storage });

// File upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully"); // Respond if upload is successful
  } catch (error) {
    console.error(error); // Log errors to the console
    res.status(500).json("Failed to upload file"); // Send error response
  }
});

// Define API routes for authentication, users, and posts
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/users", userRoute); // User-related routes
app.use("/api/posts", postRoute); // Post-related routes

// Start the backend server on port 8800
app.listen(8800, () => {
  console.log("Backend server is running!");
});
