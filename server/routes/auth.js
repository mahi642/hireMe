 const express = require("express");
 const router = express.Router();


 const authController  = require("../controllers/auth");


 router.post("/signup",authController.createUser);
 router.post('/login',authController.verifyUser);
 router.post("/adminlogin",authController.adminLogin);



 module.exports = router;

 