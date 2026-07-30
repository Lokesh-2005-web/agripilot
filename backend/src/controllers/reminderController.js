const Reminder = require("../models/reminder");

// Create Reminder
const createReminder = async (req, res) => {
    try {
        const {
            title,
            description,
            reminderDate,
            completed,
            crop,
        } = req.body;

        const reminder = await Reminder.create({
            title,
            description,
            reminderDate,
            completed,
            crop,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Reminder created successfully",
            reminder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Reminders
const getAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({
            user: req.user.id,
        }).populate("crop", "cropName variety");

        res.status(200).json({
            success: true,
            count: reminders.length,
            reminders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Reminder by ID
const getReminderById = async (req, res) => {
    try {
        const reminder = await Reminder.findOne({
            _id: req.params.id,
            user: req.user.id,
        }).populate("crop", "cropName variety");

        if (!reminder) {
            return res.status(404).json({
                success: false,
                message: "Reminder not found",
            });
        }

        res.status(200).json({
            success: true,
            reminder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Reminder
const updateReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findOneAndUpdate(
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

        if (!reminder) {
            return res.status(404).json({
                success: false,
                message: "Reminder not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Reminder updated successfully",
            reminder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Reminder
const deleteReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!reminder) {
            return res.status(404).json({
                success: false,
                message: "Reminder not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Reminder deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createReminder,
    getAllReminders,
    getReminderById,
    updateReminder,
    deleteReminder,
};
