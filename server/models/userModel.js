const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "please add the user name"],
    },
    lastname: {
        type: String,
        required: [true, "please add the user name"],
    },
    picture:{
        type:String
    },
    email: {
        type: String,
        required: [true, "please add the email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "please add the userpassword"],
    }
},
    {
        timestamps:true,
    }
);

module.exports=mongoose.model("User",userSchema);