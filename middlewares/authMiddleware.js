
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => { //since it's a middleware, therefore it will have req,res and next also
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) { //these two conditions mean that we have a token.
        try {
            token = req.headers.authorization.split(" ")[1]; // the format of the token is - bearer som$thi&token like this. So we will need to split out the token from the request

            //now we will decode the token and verify that the token is valid
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //now the user whose token is that, we will send that user details to req.user object. This object will be used in the next controller which can be anything like fetchAllUsers controller or any controller that uses this middleware
            req.user = await User.findById(decoded.id).select("-password");
            next(); //calling the next controller function 

        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, Token Failed");
        };
    };

    if (!token) { //if there is no token 
        res.status(401);
        throw new Error("Not authorized, no token")
    }
});

module.exports = protect;