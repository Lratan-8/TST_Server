const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../../models/UserModel')

const fetchAllusers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [                                                      //$or is an operator of mongoDB - This means that you need to fulfill either one of these requests
            { name: { $regex: req.query.search, $options: "i" } },   //Request 1
            { email: { $regex: req.query.search, $options: "i" } }   //Request 2
        ]
        //if any of the above queries match, then the mongoDB's server will return it.
    } : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); //Now that we have all the filters in place, we will actually find them in the database. Note - IF we pass nothing inside the find() then it will automatically give us all the users in that database

    return res.send(users);

});

module.exports = fetchAllusers;