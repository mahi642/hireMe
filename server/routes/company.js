const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company");
const fetchUser = require("../middlewares/gurad")

router.post("/postjob",fetchUser,companyController.postjob);
router.get("/companydetails",fetchUser,companyController.getdetails)


module.exports = router;
