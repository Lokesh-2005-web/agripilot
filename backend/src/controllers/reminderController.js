const Reminder = require("../models/reminder");

// ==============================
// Create Reminder
// ==============================
const createReminder = async (req, res, next) => {
    try {
        const { title, description, date, type } = req.body;

        const reminder = await Reminder.create({
            title,
            description,
            date,
            type,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Reminder created successfully",
            reminder,
        });
    } catch (error) {
        next(error);
    }
};

// ==============================
// Get All Reminders
// Pagination + Search
// ==============================
const getAllReminders = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const query = {
            user: req.user.id,
            title: {
                $regex: search,
                $options: "i",
            },
        };

        const total = await Reminder.countDocuments(query);

        const reminders = await Reminder.find(query)
            .sort({ date: 1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            count: reminders.length,
            reminders,
        });
    } catch (error) {
        next(error);
    }
};

// ==============================
// Get Reminder By ID
// ==============================
const getReminderById = async (req, res, next) => {
    try {
        const reminder = await Reminder.findOne({
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
            reminder,
        });
    } catch (error) {
        next(error);
    }
};

// ==============================
// Update Reminder
// ==============================
const updateReminder = async (req, res, next) => {
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
        next(error);
    }
};

// ==============================
// Delete Reminder
// ==============================
const deleteReminder = async (req, res, next) => {
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
        next(error);
    }
};

module.exports = {
    createReminder,
    getAllReminders,
    getReminderById,
    updateReminder,
    deleteReminder,
};