const {validateToken} = require("../services/auth");
const jwt = require("jsonwebtoken");

function checkForAuthenticationCookie(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            req.user = null;
            return next();
        }

        try{
        const userPayload = validateToken(tokenCookieValue);
        req.user = userPayload;
        }
        catch(error) {
            // Token is invalid or expired
            console.error("[AUTH] Token validation failed:", error.message);
            req.user = null; // Explicitly set user to null
        }
        next();
    }

}

module.exports = {
    checkForAuthenticationCookie,
};