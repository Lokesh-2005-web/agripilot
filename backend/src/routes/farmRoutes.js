const express = require("express");
const router = express.Router();

const {
    createFarm,
    getAllFarms,
    getFarmById,
    updateFarm,
    deleteFarm,
} = require("../controllers/farmController");

const { protect } = require("../middleware/authMiddleware");

const validateFarm = require("../validators/farmValidator");
const handleValidationErrors = require("../validators/validationMiddleware");

/**
 * @swagger
 * tags:
 *   name: Farms
 *   description: Farm Management APIs
 */

/**
 * @swagger
 * /api/farms:
 *   post:
 *     summary: Create a new farm
 *     tags: [Farms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - size
 *             properties:
 *               name:
 *                 type: string
 *                 example: Green Valley Farm
 *               location:
 *                 type: string
 *                 example: Warangal
 *               size:
 *                 type: number
 *                 example: 10.5
 *     responses:
 *       201:
 *         description: Farm created successfully
 *       400:
 *         description: Validation error
 */
router.post(
    "/",
    protect,
    validateFarm,
    handleValidationErrors,
    createFarm
);

/**
 * @swagger
 * /api/farms:
 *   get:
 *     summary: Get all farms
 *     tags: [Farms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of farms
 */
router.get("/", protect, getAllFarms);

/**
 * @swagger
 * /api/farms/{id}:
 *   get:
 *     summary: Get farm by ID
 *     tags: [Farms]
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
 *         description: Farm retrieved successfully
 *       404:
 *         description: Farm not found
 */
router.get("/:id", protect, getFarmById);

/**
 * @swagger
 * /api/farms/{id}:
 *   put:
 *     summary: Update farm
 *     tags: [Farms]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               size:
 *                 type: number
 *     responses:
 *       200:
 *         description: Farm updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Farm not found
 */
router.put(
    "/:id",
    protect,
    validateFarm,
    handleValidationErrors,
    updateFarm
);

/**
 * @swagger
 * /api/farms/{id}:
 *   delete:
 *     summary: Delete farm
 *     tags: [Farms]
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
 *         description: Farm deleted successfully
 *       404:
 *         description: Farm not found
 */
router.delete("/:id", protect, deleteFarm);

module.exports = router;