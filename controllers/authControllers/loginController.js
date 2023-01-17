const asyncHandler = require('express-async-handler');
const generateToken = require('../../config/generateJWT');
const User = require('../../models/UserModel');

const loginController = asyncHandler( async (req,res)=>{

    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            pic: user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password")
    }
})

module.exports = loginController;