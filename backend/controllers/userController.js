const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


/*function verifyEmail(email){
    //@desc transporter for email verification
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        }
    });

    const token = jwt.sign({
        data: 'Token Data'
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "10m"}
    );

    const mailConfig = {
        from: `${process.env.SENDER_EMAIL}`,

        to: `${email}`,

        subject: 'Email Verification',

        text: `Hi! There, You have recently visited 
            our website and entered your email.
            Please follow the given link to verify your email
            http://localhost:${port}/verify/${token} 
            Thanks`
    };

    transporter.sendMail(mailConfigurations, function(err, info){
        if (err){
            res.status(400);
            throw Error(err);
        } 
        console.log('Email Sent Successfully');
        console.log(info);
    });


};*/

//@desc Register a user
//@route POST /api/users/register
//@acess public 
const registerUser = asyncHandler(async (req, res) => {
    console.log("The request body is: ",req.body);

    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(200).json({ error: "All fields are mandatory !" });
    };

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        return res.status(200).json({ error: "User already exists !" });
    };

    //Hash password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ",hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`user created ${user}`);
    if(user){
        res.status(200).json({_id: user.id, email: user.email});
    }else {
        return res.status(200).json({ error: "Invalid user data" });
    }

    res.json({message: "Register the user"});
});

//@desc Login to a user
//@route POST /api/users/login
//@acess public 
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(200).json({ error: "Email and password are required!" });
    };

    const user = await User.findOne({email});
    if(!user){
        console.log("user does not exist!");
        return res.status(200).json({ error: "user does not exist!" });
    };

    //compare password with hashed password

    if(await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1hr"}
        );
        res.status(200).json({accessToken});
    }else{
        console.log("Password is incorrect!");
        return res.status(200).json({ error: "Password is incorrect!" });
    };

});


//@desc Current user
//@route GET /api/users/current
//@acess private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});



module.exports = {registerUser,loginUser,currentUser};