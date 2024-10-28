// resolvers.js
const User = require("../models/user"); // Adjust the path to your User model
const Job = require("../models/job");

const resolvers = {
  Query: {
    userCount: async () => {
      try {
        const users = await User.find({ role: "user" });
        return users.length;
      } catch (error) {
        console.error("Error in fetching user count:", error);
        throw new Error("Failed to fetch user count");
      }
    },
    companyCount: async () => {
      try {
        const companies = await User.find({ role: "company" });
        return companies.length;
      } catch (error) {
        console.error("Error in fetching company count:", error);
        throw new Error("Failed to fetch company count");
      }
    },
    jobCount: async () => {
      try {
        const jobs = await Job.find();
        return jobs.length;
      } catch (error) {
        console.error("Error in fetching job count:", error);
        throw new Error("Failed to fetch job count");
      }
    },
    jobs: async () => {
      try {
       const jobs = await Job.find();
       const jobsWithCompanyNames = await Promise.all(
         jobs.map(async (job) => {
           // Fetch the company details using the company ID
           const company = await User.findById(job.company);
           return {
             id: job._id.toString(), // Ensure you return the ID correctly
             title: job.jobRole, // Assuming jobRole is the title of the job
             company: company ? company.name : "Unknown Company", // Get the company name
             salary: job.salary, // Salary remains a string
             location: job.workLocation, // Adjust if needed
             createdAt: job.createdAt.toISOString(), // Convert to string if necessary
           };
         })
       );
       return jobsWithCompanyNames;
      } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error("Error fetching jobs");
      }
    },
  },
};

module.exports = resolvers;
