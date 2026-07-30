const express = require("express");

const router = express.Router();

const { getWeather } = require("../controllers/weatherController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:farmId", protect, getWeather);

module.exports = router;