const mongoose = require("mongoose");

const curretnUsersSchema = mongoose.Schema({

    email: {
        type: String,
        required: [true, "please add the email address"],
    },
    refreshToken: {
        type: String,
        required: [true, "Please add the refresh token"]
    }
},
    {
        timestamps: true,
    }
);

module.exports=mongoose.model("CurrentUsers",curretnUsersSchema);