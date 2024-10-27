const User = require("../models/user");
const jwt = require("jsonwebtoken"); // Make sure to import jwt
require("dotenv").config();

module.exports.getUsers =async(req,res)=>{
  try {
    console.log("req",req.user);
    
    const users = await User.find({role:"user"});
    if(!users){
      return res.status(404).json({message:"No users found"});
    }
    res.status(200).json(users);

    
  } catch (error) {
    console.log("Error in getting deatials of users in backend",error);
    res.status(500).json({ message: "Error in getting deatials of users"})

    
  }
}

module.exports.getCompanies = async(req,res)=>{
  try {
    console.log("req is",req.user);
    
    const companies = await User.find({role:"company"});
    if(!companies){
      return res.status(404).json({message:"No companies found"});
    }
    res.status(200).json(companies);

    } catch (error) {
    console.log("Error in getting deatials of companies in backend",error);
    res.status(500).json({ message: "Error in getting deatials of companies"});
  }
}
