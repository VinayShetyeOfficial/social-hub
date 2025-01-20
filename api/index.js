// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Load environment variables from the .env file
dotenv.config();

// Connect to MongoDB using credentials from the environment file
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Serve static files from the "public/images" directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cors());

// Middleware to parse JSON payloads
app.use(express.json());

// Add security headers to API responses
app.use(helmet());

// Log API requests for monitoring and debugging
app.use(morgan("common"));

// Configure file upload handling with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public/images");
    cb(null, uploadPath); // Set destination for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`; // Create a unique filename
    cb(null, uniqueName); // Save the file with the unique name
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
      false
    ); // Reject the file
  }
};

// No File Size Limit
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// 10MB file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: fileFilter,
});

// File upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({
      message: "File uploaded successfully",
      fileName: req.file.filename, // Return the filename for reference
    });
  } catch (error) {
    console.error("File upload failed:", error);
    res.status(500).json({ message: "Failed to upload file" });
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
