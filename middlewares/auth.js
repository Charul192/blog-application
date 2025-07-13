const { validateToken } = require("../services/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // <-- Add this line

function checkForAuthenticationCookie(cookieName) {
    return async (req, res, next) => { // <-- Make this async
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            req.user = null;
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            // Fetch the full user from the database
            const user = await User.findById(userPayload._id); // or userPayload.id
            req.user = user || null;
        } catch (error) {
            console.error("[AUTH] Token validation failed:", error.message);
            req.user = null;
        }
        next();
    }
}

module.exports = {
    checkForAuthenticationCookie,
};