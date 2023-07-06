const jwt= require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CurrentUsersDB = require("../models/currentUsersModel");
const { use } = require("../routes/contactRoutes");
require("dotenv").config();

//@desc returns new accesstoken
//@route get /api/refresh
//@access private
const handleRefreshToken = asyncHandler(async(req,res)=>{
    const cookies=req.cookies

    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser= await CurrentUsersDB.findOne({"refreshToken":refreshToken});
    if(!foundUser) return res.status(401);
    //console.log("found",foundUser)
    // verify jwt 
    await jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decode)=>{
        if(err || foundUser.username !== decode.user.username){
            res.status(401);
            throw new Error("User is not authorized");
        }
        const accessToken=jwt.sign({
            user: {
                email: decode.user.email,
                id: decode.user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
        //console.log(decode);
        res.json({accessToken})
       
    });

})

//check for expired refresh tokens every 6hr
var hours = 1
var the_interval = hours * 60 * 60 * 1000;

setInterval(async()=>{
  console.log("I am doing my 5 minutes check");
  const allcurrUsers= await CurrentUsersDB.find();
  const deleteList=[]
  allcurrUsers.forEach((user)=>{
    jwt.verify(user.refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decode)=>{
        if(decode==null){
            deleteList.push(user._id);
        }
    })
  })
  await CurrentUsersDB.deleteMany(
    {
        _id:{
            $in:deleteList
        }
    }
  )

}, the_interval);

module.exports = {handleRefreshToken};