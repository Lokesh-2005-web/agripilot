const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
    try {
        let token;

        // Check if Authorization header exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // If no token is provided
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. No token provided.",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user and remove the password from the result
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

module.exports = { protect };