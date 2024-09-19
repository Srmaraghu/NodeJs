const { getUser } = require("../service/auth");

// Middleware to check if the user is authenticated
function checkForAuthentication(req, res, next) {
    // Retrieve the token from the cookies (if it exists)
    const tokenCookie = req.cookies?.token;

    // Initialize req.user to null, indicating no user is authenticated by default
    req.user = null;

    // If no token is found in the cookies, proceed to the next middleware or route handler
    if (!tokenCookie) {
        return next();
    }

    // If a token is found, assign it to a variable
    const token = tokenCookie;
    
    // Decode the user information from the token
    const user = getUser(token);

    // Attach the user information to the request object, making it available to subsequent middleware and routes
    req.user = user;


     // Pass the user information to the EJS templates
     res.locals.user = user;

     
    // Proceed to the next middleware or route handler
    return next();
}

// Middleware to restrict access to routes based on user roles
function restrictTo(roles) {
    return function(req, res, next) {
        // If the user is not authenticated, redirect them to the login page
        if (!req.user) {
            return res.redirect("/login");
        }

        // If the user's role is not included in the allowed roles, return an "Unauthorized" response
        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");
        }

        // If the user is authenticated and has the correct role, proceed to the next middleware or route handler
        return next();
    }
}

module.exports = {
    restrictTo,         
    checkForAuthentication  
};
