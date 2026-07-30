const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
    {
        cropName: {
            type: String,
            required: true,
            trim: true,
        },
        variety: {
            type: String,
            required: true,
            trim: true,
        },
        area: {
            type: Number,
            required: true,
        },
        season: {
            type: String,
            required: true,
            enum: ["Kharif", "Rabi", "Zaid"],
        },
        sowingDate: {
            type: Date,
            required: true,
        },
        expectedHarvestDate: {
            type: Date,
            required: true,
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

module.exports = mongoose.model("Crop", cropSchema);