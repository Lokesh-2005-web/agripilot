const { body } = require("express-validator");

const validateFarm = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Farm name is required"),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required"),

    body("size")
        .isFloat({ gt: 0 })
        .withMessage("Farm size must be greater than 0"),
];

module.exports = validateFarm;