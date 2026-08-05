const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    farmName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    area: {
      type: Number,
      required: true,
    },

    soilType: {
      type: String,
      enum: [
        "Clay",
        "Sandy",
        "Loamy",
        "Silty",
        "Peaty",
        "Chalky",
      ],
      required: true,
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    // ===========================
    // Borewell Details
    // ===========================

    borewellDepth: {
      type: Number,
      default: 0,
    },

    waterLevel: {
      type: Number,
      default: 0,
    },

    motorStatus: {
      type: String,
      enum: [
        "Healthy",
        "Running",
        "Needs Service",
        "Stopped",
      ],
      default: "Healthy",
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

module.exports = mongoose.model("Farm", farmSchema);