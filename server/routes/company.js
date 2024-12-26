const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company");
const fetchUser = require("../middlewares/gurad")

router.post("/postjob",fetchUser,companyController.postjob);
router.get("/companydetails",fetchUser,companyController.getdetails)
router.get("/currentjobs",fetchUser,companyController.getCurrentjobs);
router.get("/previousjobs",fetchUser,companyController.getPreviousJobs);
router.get("/applications/:jobId",fetchUser,companyController.getApplications);
router.get("/companyUserdetails",fetchUser,companyController.getUsersforCompany);
router.get("/dashboarddata",fetchUser,companyController.getDashboardData);
router.get("/totalcosttojob",fetchUser,companyController.getTotalCost);
router.post(
  "/updateCompanyDetails",
  fetchUser,
  companyController.updateCompanyDetails
);






module.exports = router;

