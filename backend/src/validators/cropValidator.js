const { body } = require("express-validator");

const validateCrop = [
    body("cropName")
        .trim()
        .notEmpty()
        .withMessage("Crop name is required"),

    body("variety")
        .trim()
        .notEmpty()
        .withMessage("Variety is required"),

    body("area")
        .isFloat({ gt: 0 })
        .withMessage("Area must be greater than 0"),

    body("season")
        .trim()
        .notEmpty()
        .withMessage("Season is required"),

    body("sowingDate")
        .isISO8601()
        .withMessage("Valid sowing date is required"),

    body("expectedHarvestDate")
        .isISO8601()
        .withMessage("Valid expected harvest date is required"),
];

module.exports = validateCrop;