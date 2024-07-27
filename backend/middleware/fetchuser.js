const jwt = require('jsonwebtoken');
require('dotenv').config(); // Import and configure dotenv

const JWT_SECRET = 'Mukulisagoo$boy'; // Use the secret from the .env file

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
