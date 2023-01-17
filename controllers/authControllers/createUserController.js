//express async handler will help us check if the information from the req is undefined or not and will throw an error
const asyncHandler = require('express-async-handler');
const User = require('../../models/UserModel');

const createUser = asyncHandler (async (req,res) =>{

    const {name, email, password, pic } = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields");
    };

    //checking if the user already exists in the database

    const userExists = await User.findOne({email}) //findOne is a query from the MongoDB and not from the mongoose

    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({ //User.create is also a MongoDB query
        name,email,password,pic
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id)
        });
    }else {
        res.status(400);
        throw new Error("Failed to create the user")
    };

});

module.exports = createUser