const Farm = require("../models/farm");

// Create Farm
const createFarm = async (req, res) => {
    try {
        const {
            farmName,
            location,
            area,
            soilType,
            latitude,
            longitude,
        } = req.body;

        const farm = await Farm.create({
            farmName,
            location,
            area,
            soilType,
            latitude,
            longitude,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Farm created successfully",
            farm,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Farms
const getAllFarms = async (req, res) => {
    try {
        const farms = await Farm.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            count: farms.length,
            farms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Farm
const getFarmById = async (req, res) => {
    try {
        const farm = await Farm.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!farm) {
            return res.status(404).json({
                success: false,
                message: "Farm not found",
            });
        }

        res.status(200).json({
            success: true,
            farm,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Farm
const updateFarm = async (req, res) => {
    try {
        const farm = await Farm.findOneAndUpdate(
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

        if (!farm) {
            return res.status(404).json({
                success: false,
                message: "Farm not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Farm updated successfully",
            farm,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Farm
const deleteFarm = async (req, res) => {
    try {
        const farm = await Farm.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!farm) {
            return res.status(404).json({
                success: false,
                message: "Farm not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Farm deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createFarm,
    getAllFarms,
    getFarmById,
    updateFarm,
    deleteFarm,
};