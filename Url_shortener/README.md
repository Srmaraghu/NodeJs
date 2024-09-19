# URL Shortener

This is a simple URL shortener project built with Node.js, Express, MongoDB, and EJS. It allows users to generate shortened URLs and view analytics for each shortened link, such as the number of clicks.

## Features

- User Authentication (Sign Up, Log In, Log Out)
- Shorten URLs
- View and track click analytics for shortened URLs
- JWT Authentication for secure routes
- Role-based access control



## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or above)
- [MongoDB](https://www.mongodb.com/) (Local or Cloud Instance)

## Installation

1. Clone the repository:

   
   git clone https://github.com/your-username/urlshortener.git
   cd urlshortener



2. Install dependencies:    
        npm install

3.  Set up environment variables:

        Create a .env file in the root of the project and add the following variables:


        MONGO_URI=<your-mongodb-connection-string>
        JWT_SECRET=<your-jwt-secret>
        PORT=8001
Replace <your-mongodb-connection-string> with your MongoDB connection string.
Replace <your-jwt-secret> with a secret key for JWT authentication.


4.  Start the MongoDB server:

        If you're using a local MongoDB server, make sure it's running:
        mongod


5.      Run the application:

        npm start
    This will start the Express server on the specified port (default: 8001).

6. Open your browser and go to:http://localhost:8001/





## Routes
## Public Routes
GET / - Home page with URL shortener form.
GET /login - Log In page.
GET /signup - Sign Up page.
POST /user - Register a new user.
POST /user/login - Log in a user.


## Protected Routes
POST /url - Create a new short URL (requires authentication).
GET /logout - Log out a user.


## URL Redirection
GET /url/:shortId - Redirect to the original URL associated with the shortId.


## Middleware
checkForAuthentication: Verifies if the user is authenticated by checking the JWT in the cookie.
restrictTo: Restricts access to specific routes based on user roles.


## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing
Feel free to submit issues, fork the repository and send pull requests!

Contact
For any questions or suggestions, feel free to contact me at [raghushaaarma@example.com].