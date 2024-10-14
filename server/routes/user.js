const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const  fetchUser = require("../middlewares/gurad")

router.get("/apply/:jobId",fetchUser,userController.applyJob);
router.get("/appliedJobs/",fetchUser,userController.appliedJobs);
router.get("/bookmarkJob/:jobId",fetchUser,userController.bookmarkJob);
router.get("/alljobs",userController.getAlljobs);
router.get("/getJobDetailsById/:jobId",userController.getJobById);
router.get("/jobdata/:jobId", userController.getJobdata);
router.get("/bookmarkedJobs",fetchUser,userController.bookmarkedJobs);
module.exports=router;