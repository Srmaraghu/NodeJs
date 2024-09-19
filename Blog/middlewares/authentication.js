const { validateToken } = require('../services/authentication');


function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
           return next();
        }

        try {
            // Validate the token stored in the cookie
            const userPayload = validateToken(tokenCookieValue);

            // If validation is successful, attach the decoded user information to the `req` object
            req.user = userPayload;
           



        } catch (err) {
        }
        next();
    }
}

module.exports = checkForAuthenticationCookie;