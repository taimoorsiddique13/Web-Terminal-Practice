const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this for handling JSON data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public directory

// Routes
const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
