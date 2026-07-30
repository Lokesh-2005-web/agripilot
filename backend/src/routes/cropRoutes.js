const express = require("express");
const router = express.Router();

const {
    createCrop,
    getAllCrops,
    getCropById,
    updateCrop,
    deleteCrop,
    uploadCropImage,
} = require("../controllers/cropController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const validateCrop = require("../validators/cropValidator");
const handleValidationErrors = require("../validators/validationMiddleware");

/**
 * @swagger
 * tags:
 *   name: Crops
 *   description: Crop Management APIs
 */

/**
 * @swagger
 * /api/crops:
 *   post:
 *     summary: Create a new crop
 *     tags: [Crops]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cropName:
 *                 type: string
 *               variety:
 *                 type: string
 *               area:
 *                 type: number
 *               season:
 *                 type: string
 *               sowingDate:
 *                 type: string
 *               expectedHarvestDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Crop created successfully
 */
router.post(
    "/",
    protect,
    validateCrop,
    handleValidationErrors,
    createCrop
);

/**
 * @swagger
 * /api/crops:
 *   get:
 *     summary: Get all crops
 *     tags: [Crops]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all crops
 */
router.get("/", protect, getAllCrops);

/**
 * @swagger
 * /api/crops/{id}:
 *   get:
 *     summary: Get crop by ID
 *     tags: [Crops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Crop found
 *       404:
 *         description: Crop not found
 */
router.get("/:id", protect, getCropById);

/**
 * @swagger
 * /api/crops/{id}:
 *   put:
 *     summary: Update crop
 *     tags: [Crops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Crop updated successfully
 */
router.put(
    "/:id",
    protect,
    validateCrop,
    handleValidationErrors,
    updateCrop
);

/**
 * @swagger
 * /api/crops/{id}:
 *   delete:
 *     summary: Delete crop
 *     tags: [Crops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Crop deleted successfully
 */
router.delete("/:id", protect, deleteCrop);

/**
 * @swagger
 * /api/crops/{id}/image:
 *   post:
 *     summary: Upload crop image
 *     tags: [Crops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post(
    "/:id/image",
    protect,
    upload.single("image"),
    uploadCropImage
);

module.exports = router;