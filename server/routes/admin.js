const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/gurad")

const adminController = require("../controllers/admin");


router.get("/getUsers",fetchUser,adminController.getUsers);
router.get("/getCompanies",fetchUser,adminController.getCompanies);



module.exports = router;