const express =require("express");

const router =express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    currentUser,
    googleLogin,
    googleRegister
} = require("../controllers/userController");

const validateToken = require("../middlerware/validateTokenHandler");

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser);

router.get("/currentuser",validateToken,currentUser);

router.post('/google/login',googleLogin);

router.post('/google/register',googleRegister);

module.exports =router;