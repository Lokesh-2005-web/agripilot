const express = require("express");

const router = express.Router();

const {
  getHarvestPrediction,
} = require("../controllers/harvestController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, getHarvestPrediction);

module.exports = router;