const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => { //since it's a middleware, therefore it will have req,res and next also
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) { //these two conditions mean that we have a token.
        try {
            token = req.headers.authorization.split(" ")[1];

            //now we will decode the token.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();

        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, Token Failed")
        };
    };

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token")
    }
});

module.exports = protect;