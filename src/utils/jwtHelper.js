const jwt = require("jsonwebtoken");
require('dotenv').config();

function GenerateToken(email) {
    let token = null;
    try {
        token = jwt.sign(
            { email: email },
            process.env.JWT_SECRETKEY,
        );
    } catch (err) {
        const error =
            new Error("Error! Something went wrong.");
        return next(error);
    }
    return token;
}

module.exports = GenerateToken;
