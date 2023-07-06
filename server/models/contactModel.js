const mongoose = require("mongoose");

const contactListSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },
})

const contactSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add email"]
    },
    contactlist: {
        type: [contactListSchema],
        required: [true, "Please add contact list"]

    }
},
    {
        timestamps: true,
    }
)




module.exports = mongoose.model("Contact", contactSchema);