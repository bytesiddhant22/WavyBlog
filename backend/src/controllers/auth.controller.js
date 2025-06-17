const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');


const generateToken = (userId) => {
    return jwt.sign({id: userId} , process.env.JWT_SECRET , {expiresIn:'7d'});
};

exports.signup = async (req,res) => {
    try {
        const { username , email , password } = req.body;

        const userExits = await User.findOne({
            $or: [{ email } , { username }]
        });
        if (userExits) return res.status(400).json({message: 'User already exist'});

        const user = await User.create({username , email , password});

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    catch (error){
        res.status(500).json({message: "Server Error"});
    }

};


exports.login = async (req, res) => {
    try{
        const { email , password} = req.body;

        const user = await User.findOne({email});
        if (!user || !(await user.matchPassword(password)))
            return res.status(401).json({message: 'Invalid Credentials'});
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });

    }
    catch (error){
        res.status(500).json({message: "Server Error"});
    }
};