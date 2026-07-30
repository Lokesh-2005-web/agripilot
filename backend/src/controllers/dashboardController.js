const Crop = require("../models/crop");
const Farm = require("../models/farm");
const Reminder = require("../models/reminder");

const getDashboard = async (req, res) => {
    try {
        const totalCrops = await Crop.countDocuments({
            user: req.user.id,
        });

        const totalFarms = await Farm.countDocuments({
            user: req.user.id,
        });

        const totalReminders = await Reminder.countDocuments({
            user: req.user.id,
        });

        const pendingReminders = await Reminder.countDocuments({
            user: req.user.id,
            completed: false,
        });

        const completedReminders = await Reminder.countDocuments({
            user: req.user.id,
            completed: true,
        });

        res.status(200).json({
            success: true,
            dashboard: {
                totalCrops,
                totalFarms,
                totalReminders,
                pendingReminders,
                completedReminders,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getDashboard,
};