const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        reminderDate: {
            type: Date,
            required: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },

        crop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop",
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reminder", reminderSchema);