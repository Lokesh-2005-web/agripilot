const Farm = require("../models/farm");

// ==============================
// Create Farm
// ==============================
const createFarm = async (req, res, next) => {
  try {
    const {
      farmName,
      location,
      area,
      soilType,
      latitude,
      longitude,
      borewellDepth,
      waterLevel,
      motorStatus,
    } = req.body;

    const farm = await Farm.create({
      farmName,
      location,
      area,
      soilType,
      latitude,
      longitude,
      borewellDepth,
      waterLevel,
      motorStatus,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Farm created successfully",
      farm,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// Get All Farms
// ==============================
const getAllFarms = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {
      user: req.user.id,
      farmName: {
        $regex: search,
        $options: "i",
      },
    };

    const total = await Farm.countDocuments(query);

    const farms = await Farm.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      count: farms.length,
      farms,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// Get Farm By ID
// ==============================
const getFarmById = async (req, res, next) => {
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
    next(error);
  }
};

// ==============================
// Update Farm
// ==============================
const updateFarm = async (req, res, next) => {
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
    next(error);
  }
};

// ==============================
// Delete Farm
// ==============================
const deleteFarm = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = {
  createFarm,
  getAllFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
};