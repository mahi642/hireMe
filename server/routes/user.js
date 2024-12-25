const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const  fetchUser = require("../middlewares/gurad");
const upload = require("../middlewares/upload");

router.get("/apply/:jobId",fetchUser,userController.applyJob);
router.get("/appliedJobs/",fetchUser,userController.appliedJobs);
router.get("/bookmarkJob/:jobId",fetchUser,userController.bookmarkJob);
router.delete("/removebookmark/:jobId",fetchUser,userController.removeBookmark);
router.get("/alljobs",userController.getAlljobs);
router.get("/getJobDetailsById/:jobId",userController.getJobById);
router.get("/jobdata/:jobId", userController.getJobdata);
router.get("/bookmarkedJobs",fetchUser,userController.bookmarkedJobs);
router.post(
  "/upload",
  fetchUser,
  upload.single("resume"),
  userController.updateprofile
);
router.get("/getUserdetails",fetchUser,userController.getUserDetails);
module.exports=router;
