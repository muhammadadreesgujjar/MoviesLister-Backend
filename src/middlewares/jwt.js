
const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(200)
            .json(
                {
                    status: 'error',
                    message: "Error!Token was not provided."
                }
            );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (!decodedToken.email) {
        res.status(200)
            .json(
                {
                    status: 'error',
                    message: "Error!Token is not correct."
                }
            );
    }
    req.email = decodedToken.email;
    next();
}

module.exports = verifyToken;