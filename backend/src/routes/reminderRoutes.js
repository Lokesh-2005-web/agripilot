const express = require("express");
const router = express.Router();

const {
    createReminder,
    getAllReminders,
    getReminderById,
    updateReminder,
    deleteReminder,
} = require("../controllers/reminderController");

const { protect } = require("../middleware/authMiddleware");

const validateReminder = require("../validators/reminderValidator");
const handleValidationErrors = require("../validators/validationMiddleware");

/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: Reminder Management APIs
 */

/**
 * @swagger
 * /api/reminders:
 *   post:
 *     summary: Create a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 example: Water Paddy
 *               description:
 *                 type: string
 *                 example: Irrigate the field
 *               date:
 *                 type: string
 *                 format: date-time
 *               type:
 *                 type: string
 *                 example: Irrigation
 *     responses:
 *       201:
 *         description: Reminder created successfully
 */
router.post(
    "/",
    protect,
    validateReminder,
    handleValidationErrors,
    createReminder
);

/**
 * @swagger
 * /api/reminders:
 *   get:
 *     summary: Get all reminders
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reminders
 */
router.get("/", protect, getAllReminders);

/**
 * @swagger
 * /api/reminders/{id}:
 *   get:
 *     summary: Get reminder by ID
 *     tags: [Reminders]
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
 *         description: Reminder retrieved successfully
 */
router.get("/:id", protect, getReminderById);

/**
 * @swagger
 * /api/reminders/{id}:
 *   put:
 *     summary: Update reminder
 *     tags: [Reminders]
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
 *         description: Reminder updated successfully
 */
router.put(
    "/:id",
    protect,
    validateReminder,
    handleValidationErrors,
    updateReminder
);

/**
 * @swagger
 * /api/reminders/{id}:
 *   delete:
 *     summary: Delete reminder
 *     tags: [Reminders]
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
 *         description: Reminder deleted successfully
 */
router.delete("/:id", protect, deleteReminder);

module.exports = router;