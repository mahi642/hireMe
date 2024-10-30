const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); 

const fetchuser = ((req,res,next)=>{
  const token = req.header('auth-token');
  console.log("roken is",token)
  if(!token){
    return res.status(400).json({msg:"token not passed"})
  }

  try {
    const data = jwt.verify(token,process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {

     res.json({ error: "Pleasse authenticate using valid token" });
  }
})

module.exports = fetchuser;