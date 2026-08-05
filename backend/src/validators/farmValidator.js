const { body } = require("express-validator");

const validateFarm = [
    body("farmName")
        .trim()
        .notEmpty()
        .withMessage("Farm name is required"),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required"),

    body("area")
        .isFloat({ gt: 0 })
        .withMessage("Farm area must be greater than 0"),

    body("soilType")
        .trim()
        .notEmpty()
        .withMessage("Soil type is required"),
];

module.exports = validateFarm;