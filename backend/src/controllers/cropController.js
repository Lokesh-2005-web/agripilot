const Crop = require("../models/crop");

// Create Crop
const createCrop = async (req, res) => {
    try {
        const {
            cropName,
            variety,
            area,
            season,
            sowingDate,
            expectedHarvestDate,
        } = req.body;

        const crop = await Crop.create({
            cropName,
            variety,
            area,
            season,
            sowingDate,
            expectedHarvestDate,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Crop created successfully",
            crop,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Crops
const getAllCrops = async (req, res) => {
    try {
        const crops = await Crop.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            count: crops.length,
            crops,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Crop
const getCropById = async (req, res) => {
    try {
        const crop = await Crop.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!crop) {
            return res.status(404).json({
                success: false,
                message: "Crop not found",
            });
        }

        res.status(200).json({
            success: true,
            crop,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Crop
const updateCrop = async (req, res) => {
    try {
        const crop = await Crop.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!crop) {
            return res.status(404).json({
                success: false,
                message: "Crop not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Crop updated successfully",
            crop,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Crop
const deleteCrop = async (req, res) => {
    try {
        const crop = await Crop.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!crop) {
            return res.status(404).json({
                success: false,
                message: "Crop not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Crop deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCrop,
    getAllCrops,
    getCropById,
    updateCrop,
    deleteCrop,
};