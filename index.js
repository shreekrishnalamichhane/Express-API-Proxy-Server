const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Environment Variables
const RATE_LIMIT_WINDOW_SIZE =
  process.env.RATE_LIMIT_WINDOW_SIZE || 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_TRY = process.env.RATE_LIMIT_TRY || 10; // 10 requests in 10 minutes
const PORT = process.env.PORT || 5000;

// Initializing new express app.
const app = express();

// Configuring Rate Limiting.
const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_SIZE, //defined in .env
  max: RATE_LIMIT_TRY, //defined in .env
});

// Applying defined Ratelimiter to all requests.
app.use(limiter);

// Setting up 'trust proxy' variable to 1.
app.set("trust proxy", 1);

// Routes.
app.use("/api", require("./routes/index"));

// Enable cors.
app.use(cors());

// Starting a express server.
app.listen(PORT, () => {
  console.log(`Server is running in port:${PORT}`);
});
