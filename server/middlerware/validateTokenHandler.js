const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token =authHeader.split(" ")[1];
        await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decode.user;//append the decoded user in req to pass to router 
            next();//next() : It will run or execute the code after all the middleware function is finished.

        });
    }
    if(!token){
        res.status(401);
        throw new Error("User is not authorized or token in missing");
    }
})

module.exports = validateToken;