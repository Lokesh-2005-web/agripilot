const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const cropRoutes = require("./routes/cropRoutes");
const farmRoutes = require("./routes/farmRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to AgriPilot Backend 🚜",
    });
});
console.log({
    userRoutes,
    cropRoutes,
    farmRoutes,
    reminderRoutes,
    dashboardRoutes,
    weatherRoutes,
});
// API Routes
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/weather", weatherRoutes);

// 404 Handler (Keep this LAST)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

module.exports = app;