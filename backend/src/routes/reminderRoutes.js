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

router.post("/", protect, createReminder);
router.get("/", protect, getAllReminders);
router.get("/:id", protect, getReminderById);
router.put("/:id", protect, updateReminder);
router.delete("/:id", protect, deleteReminder);

module.exports = router;