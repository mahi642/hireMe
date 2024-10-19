const User = require("../models/user");
const JWT = require("jsonwebtoken");
// const JWT_SECRET = "hireme";
const Company = require("../models/company")
const bcrypt = require("bcrypt");
require("dotenv").config(); 

module.exports.createUser = async (req, res) => {
  try {
    console.log("body", req.body);

    const {
      name,
      email,
      password,
      role,
     
      companyLocation,
      numberOfEmployees,
      workCulture,
      facilitiesProvided,
      workStartTime,
      workEndTime,
      companyLogo,
      website,
      companyDescription,
      
    } = req.body;

    // Check if the user or company already exists
    const existingUser = await User.findOne({ email });
    const existingCompany = await Company.findOne({ email });

     if (typeof email !== "string") {
       return res
         .status(400)
         .json({ msg: "Invalid email structure in request" });
     }

    if (existingUser || existingCompany) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(5);
    const secretPass = await bcrypt.hash(password, salt);

    let newUser = null;
    let newCompany = null;

   
    
      newUser = await User.create({
        name,
        email,
        password: secretPass,
        role:role
      });
     if (role === "company") {
      newCompany = await Company.create({
        name,
        companyLocation,
        email,
        password: secretPass,
        numberOfEmployees: numberOfEmployees || 50, // Default to 50 if not provided
        workCulture: workCulture || "Flexible", // Default work culture
        facilitiesProvided: facilitiesProvided || ["Wi-Fi", "Free Snacks"], // Default facilities
        workStartTime: workStartTime || "9:00 AM", // Default start time
        workEndTime: workEndTime || "6:00 PM", 
        companyLogo: companyLogo || "default-logo.png",
        website: website|| "https://example.com",
        companyDescription: companyDescription || "This is a default company description",
      });
    } 

    // Create JWT token
    const data = {
      user: {
        id: newUser ? newUser._id : newCompany._id, // Use appropriate ID
        role, // Attach the role as well
      },
    };
    const authToken = JWT.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // Token valid for 1 hour

    return res.status(201).json({
      msg: `${role === "user" ? "User" : "Company"} created successfully`,
      user: newUser || newCompany,
      success: true,
      token: authToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


module.exports.verifyUser = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Get role from request body

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Email not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Check if the role matches
    // if (user.role !== role) {
    //   return res.status(403).json({ msg: "Role mismatch" }); // Forbidden
    // }

    // Create JWT token with user role
    const data = {
      user: {
        id: user._id,
        role: user.role, // Include role in the JWT payload
      },
    };

    const authToken = JWT.sign(data, process.env.JWT_SECRET);

    return res.status(200).json({
      msg: "Login successful",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Include role in the response if needed
      },
      token: authToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
   console.log("env",process.env.ADMIN_EMAIL);
   console.log("body",email);
   
   
    // Check admin credentials
    if (
      email.trim() === process.env.ADMIN_EMAIL.trim() &&
      password.trim() === process.env.ADMIN_PASSWORD.trim()
    ) {
      // Create the payload for the token
      const data = {
        email: email,
      };

      // Sign the JWT token
      const authToken = JWT.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" }); // Adding an expiry for better security

      // Return success response
      return res.status(200).json({
        msg: "Admin login successful",
        success: true,
        token: authToken,
      });
    } else {
      // Return unauthorized status
      return res.status(401).json({
        msg: "Incorrect admin credentials",
        success: false,
      });
    }
  } catch (error) {
    // Handle errors properly
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};