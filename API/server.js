// Importing necessary modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Controllers for handling user, product, and sale operations
const userController = require("./controllers/UserController");
const productController = require("./controllers/ProductController");
const saleController = require('./controllers/SaleController');

// Middleware for parsing incoming request bodies and handling CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' directory

// Routes for handling API endpoints
app.use("/user", userController); // User management routes
app.use("/product", productController); // Product management routes
app.use('/api/sale', saleController); // Sale management routes

// Start the server on port 3001
app.listen(3001);
