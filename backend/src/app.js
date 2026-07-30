const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

console.log("========== SWAGGER PATHS ==========");
console.log(swaggerSpec.paths);
console.log("===================================");

const app = express();

// --------------------
// Security Middleware
// --------------------
app.use(helmet());

app.use(
  cors({
    origin: "*", // Change to your frontend URL after deployment
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

// --------------------
// Body Parser
// --------------------
app.use(express.json());

// --------------------
// Swagger
// --------------------
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------------
// Routes
// --------------------
const userRoutes = require("./routes/userRoutes");
const cropRoutes = require("./routes/cropRoutes");
const farmRoutes = require("./routes/farmRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

// --------------------
// Home Route
// --------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to AgriPilot Backend 🚜",
  });
});

// --------------------
// API Routes
// --------------------
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/weather", weatherRoutes);

// --------------------
// 404 Handler
// --------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// --------------------
// Global Error Handler
// --------------------
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

module.exports = app;