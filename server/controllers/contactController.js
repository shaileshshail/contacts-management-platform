
const asynchandler = require("express-async-handler");
const ContactDB =require("../models/contactModel");
var mongoose = require('mongoose');
//@desc get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asynchandler(async(req,res)=>{
    console.log(req.user);
    const contacts=await ContactDB.find({"email":req.user.email});
    console.log(contacts)
    res.status(200).json(contacts);
})
//@desc get contact by :id
//@route GET /api/contacts/:id
//@access private
const getContact =asynchandler(async(req,res)=>{

    const contact =await ContactDB.findOne({email:req.user.email})// selecting object with email
    .select({contactlist:{$elemMatch:{_id:new mongoose.Types.ObjectId(req.params.id)}}}); // filtering contact list based on _id

    console.log("one contact",req.params.id,req.user.email)
    console.log(contact?.contactlist)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact?.contactlist);
})

//@desc add contact
//@route POST /api/contacts/
//@access private
const createContact =asynchandler(async(req,res)=>{
    const {firstname,lastname,email,phone}=req.body;
    if(!firstname || !phone){
        res.status(400);
        throw new Error("Required fields are missing");
    }
    const userEmail=req.user.email;
    console.log(userEmail);

    const newContact={
        firstname,
        lastname,
        email,
        phone,
    }
    

    const doc = await ContactDB.findOneAndUpdate(
        { email: userEmail },
        { $push: { contactlist: newContact } },
        { upsert: true, new: true }
      );

    res.status(200).json(JSON.stringify(doc));
})
//@desc update contact by :id
//@route PUT /api/contacts/:id
//@access private
const updateContact =asynchandler(async(req,res)=>{
    console.log("updating contactsssss.............")
    const updatedContact= await ContactDB.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json("updatedContact");
})
//@desc delete contacts by :id
//@route DELETE /api/contacts/:id
//@access private
const deleteContact =asynchandler(async(req,res)=>{
    const userEmail=req.user.email;
    console.log(userEmail);
    try{
        await ContactDB.updateOne(
            {email:userEmail},
            { $pull:{
                contactlist:{_id:req.params.id},
            },
        });
    }
    catch(err){
        console.log("delete error",err)
    }
    res.status(200).json("done");
})

module.exports ={
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};