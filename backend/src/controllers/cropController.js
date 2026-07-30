const Crop = require("../models/crop");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

// ==============================
// Create Crop
// ==============================
const createCrop = async (req, res, next) => {
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
        next(error);
    }
};

// ==============================
// Get All Crops
// Pagination + Search
// ==============================
const getAllCrops = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const query = {
            user: req.user.id,
            cropName: {
                $regex: search,
                $options: "i",
            },
        };

        const total = await Crop.countDocuments(query);

        const crops = await Crop.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            count: crops.length,
            crops,
        });
    } catch (error) {
        next(error);
    }
};

// ==============================
// Get Crop By ID
// ==============================
const getCropById = async (req, res, next) => {
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
        next(error);
    }
};

// ==============================
// Update Crop
// ==============================
const updateCrop = async (req, res, next) => {
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
        next(error);
    }
};

// ==============================
// Delete Crop
// ==============================
const deleteCrop = async (req, res, next) => {
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
        next(error);
    }
};

// ==============================
// Upload Crop Image
// ==============================
const uploadCropImage = async (req, res, next) => {
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

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "agripilot/crops",
            },
            async (error, result) => {
                if (error) {
                    return next(error);
                }

                crop.image = result.secure_url;
                await crop.save();

                res.status(200).json({
                    success: true,
                    message: "Image uploaded successfully",
                    image: crop.image,
                });
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCrop,
    getAllCrops,
    getCropById,
    updateCrop,
    deleteCrop,
    uploadCropImage,
};