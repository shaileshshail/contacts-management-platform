
const asynchandler = require("express-async-handler");
const UserDB = require("../models/userModel");
const CurrentUsersDB = require("../models/currentUsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require('google-auth-library');
//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asynchandler(async (req, res) => {
    const { firstname,lastname, email, password } = req.body;
    if (!firstname||!lastname || !email || !password) {
        res.status(400);
        throw new Error("All fiels are mandatory");
    }
    const userAvailable = await UserDB.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const addUser = await UserDB.create({
        "firstname": firstname,
        "lastname":lastname,
        "email": email,
        "password": hashedPassword
    })
    if (addUser) {
        res.status(200).json({ _id: addUser.id, email: addUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await UserDB.findOne({ email });
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        console.log("creating accesstoken")
        const accessToken = jwt.sign({
            user: {
                firstname:user.firstname,
                email: user.email,
                picture:user.picture,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
        console.log("creating refreshtoken")
        const refreshToken = jwt.sign({
            user: {
                firstname:user.firstname,
                email: user.email,
                picture:user.picture,
                id: user.id,
            },
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" });

        //Saving refresh token of current users 
        const addCurrentUsers = await CurrentUsersDB.create({
            "email": user.email,
            "refreshToken": refreshToken,
        })
        //cookies with httponly are not available to javascript
        //sending refreshToken for future reference
        // secure:true - only server on https 
        //sameSite:'None'-- to prevent cross-site blocking 
        //sameSite:'lax' -- check later
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000,sameSite:"Lax" }); 

        res.status(200).json({ accessToken, refreshToken});
    }
    else {
        res.status(400);
        throw new Error("Invalid Credentials");
    }
});

//@desc current user information
//@route GET /api/users/currentuser
//@access private
const currentUser = asynchandler(async (req, res) => {
    res.json(req.user);
});


const logoutUser = asynchandler(async (req, res) => {
    console.log("logging out");
    const cookies = req.cookies;
    if (!cookies?.jwt) {   //No cookies or cookie doesnt have jwt
        res.status(204);
        return res.json({ message: "Logout successfull" });
    }
    const refreshToken=cookies.jwt;
    const foundUser= await CurrentUsersDB.findOne({"refreshToken":refreshToken});
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 ,sameSite:"Lax"})
        return res.sendStatus(204);
    }
    //deleteing refresh token in DB
    await CurrentUsersDB.deleteOne({ _id: foundUser._id });
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 ,sameSite:"Lax"});
    res.sendStatus(204);
});

const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)

//@desc login user using google
//@route POST /api/users/google/login
//@access public
const googleLogin=asynchandler(async (req,res) =>{

    let authHeader = req.headers.Authorization || req.headers.authorization;
    const token =authHeader.split(" ")[1];
    const ticket=await oAuth2Client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID
    });
    const payload=ticket.getPayload();
    console.log(payload)
    const email=payload.email;
    const user = await UserDB.findOne({ email });
    //compare password with hashed password
    if (user) {
        console.log("creating accesstoken")
        const accessToken = jwt.sign({
            user: {
                firstname:user.firstname,
                email: user.email,
                picture:user.picture,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
        console.log("creating refreshtoken")
        const refreshToken = jwt.sign({
            user: {
                firstname:user.firstname,
                email: user.email,
                picture:user.picture,
                id: user.id,
            },
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" });

        //Saving refresh token of current users 
        const addCurrentUsers = await CurrentUsersDB.create({
            "email": user.email,
            "refreshToken": refreshToken,
        })
        //cookies with httponly are not available to javascript
        //sending refreshToken for future reference
        // secure:true - only server on https 
        //sameSite:'None'-- to prevent cross-site blocking 
        //sameSite:'lax' -- check later
        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000,sameSite:"Lax" }); 

        res.status(200).json({ accessToken, refreshToken});
    }
    else {
        res.status(400);
        throw new Error("Email Not registered");
    }

}
)

//@desc register user using google
//@route POST /api/users/google/register
//@access public
const googleRegister=asynchandler(async (req,res) =>{

    let authHeader = req.headers.Authorization || req.headers.authorization;
    const token =authHeader.split(" ")[1];
    const ticket=await oAuth2Client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID
    });
    const payload=ticket.getPayload();
    const email=payload.email;
    const firstname =payload.given_name;
    const lastname = payload.family_name;
    const picture=payload.picture;

    const userAvailable = await UserDB.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    const addUser = await UserDB.create({
        "firstname": firstname,
        "lastname":lastname,
        "email": email,
        "picture":picture,
        "password": "HGkSBSAdhJOrig2OHhcqoOlJgmksSkcOr23jQcCjyNkYbLMtAvY8IWxG8QyvLt5"
    })
    if (addUser) {
        res.status(200).json({ _id: addUser.id, email: addUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
}
)
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    googleLogin,
    googleRegister
}