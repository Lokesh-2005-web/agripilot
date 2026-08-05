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

  body("borewellDepth")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Borewell depth must be greater than 0"),

  body("waterLevel")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Water level must be greater than 0"),

  body("motorStatus")
    .optional()
    .isIn([
      "Healthy",
      "Running",
      "Needs Service",
      "Stopped",
    ])
    .withMessage("Invalid motor status"),
];

module.exports = validateFarm;