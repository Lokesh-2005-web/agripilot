const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const {
    validateRegister,
    validateLogin,
} = require("../validators/userValidator");

const handleValidationErrors = require("../validators/validationMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lokesh
 *               email:
 *                 type: string
 *                 example: lokesh@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post(
    "/register",
    validateRegister,
    handleValidationErrors,
    registerUser
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: lokesh@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post(
    "/login",
    validateLogin,
    handleValidationErrors,
    loginUser
);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", protect, getUserProfile);

module.exports = router;