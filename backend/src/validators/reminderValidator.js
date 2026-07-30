const { body } = require("express-validator");

const validateReminder = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .optional()
        .trim(),

    body("date")
        .isISO8601()
        .withMessage("Valid reminder date is required"),

    body("type")
        .trim()
        .notEmpty()
        .withMessage("Reminder type is required"),
];

module.exports = validateReminder;