const express = require("express");

const router = express.Router();

const {
    createCrop,
    getAllCrops,
    getCropById,
    updateCrop,
    deleteCrop,
} = require("../controllers/cropController");

const { protect } = require("../middleware/authMiddleware");

// Create Crop
router.post("/", protect, createCrop);

// Get All Crops
router.get("/", protect, getAllCrops);

// Get Single Crop
router.get("/:id", protect, getCropById);

// Update Crop
router.put("/:id", protect, updateCrop);

// Delete Crop
router.delete("/:id", protect, deleteCrop);

module.exports = router;