const Job = require("../models/job"); // Import the Job model
const Company = require("../models/company"); // Import the Company model
const User = require("../models/user");
const DOMPurify = require('dompurify'); // Import DOMPurify
const { JSDOM } = require('jsdom'); // Import JSDOM for server-side DOM


const window = new JSDOM('').window;
const purify = DOMPurify(window);

function cleanJobFields(content) {
  return purify.sanitize(content, {
    ALLOWED_TAGS: ['ul', 'li', 'p'],
  }).replace(/&nbsp;/g, ' '); // Remove &nbsp; entities
}

module.exports.postjob = async (req, res) => {
  try {
    const companyId = req.user.id; // Assuming the company ID comes from the logged-in user
    console.log("companyId:", companyId);

    // Find the user and check if they have a "company" role
    const user = await User.findById(companyId);
    if (!user || user.role !== "company") {
      return res
        .status(404)
        .json({ message: "User not found or not a company" });
    }

    const email = user.email; // Get the company's email from the user
    console.log("User email:", email);

    // Destructure job details from the request body
    const {
      jobRole,
      workLocation,
      workMode,
      jobType,
      experience,
      skills,
      salary,
      duration,
      perks,
      jobDescription,
      qualifications,
      numberOfOpenings,
      jobstartDate,
      deadLine,
    } = req.body;

    // Clean the jobDescription and qualifications fields
    const cleanedJobDescription = cleanJobFields(jobDescription);
    const cleanedQualifications = cleanJobFields(qualifications);

    // Create a new job object
    const job = new Job({
      jobRole,
      workLocation,
      workMode,
      jobType,
      experience,
      skills: skills ? skills.split(",").map((skill) => skill.trim()) : [], // Convert skills string to array and trim spaces
      salary,
      duration,
      perks: perks ? perks.split(",").map((perk) => perk.trim()) : [], // Convert perks string to array and trim spaces
      jobDescription: cleanedJobDescription,
      qualifications: cleanedQualifications,
      numberOfOpenings,
      jobstartDate,
      deadLine,
      company: companyId, // Link job to the logged-in company
    });

    // Save the job to the database
    const savedJob = await job.save();

    // Find the company by email and add the job reference
    const company = await Company.findOneAndUpdate(
      { email: email },
      { $push: { jobs: savedJob._id } }, // Push the job ID into the jobs array
      { new: true } // Return the updated document
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Also update the user document to include the new job reference
    await User.findByIdAndUpdate(
      companyId,
      { $push: { jobs: savedJob._id } },
      { new: true } // Return the updated document
    );

    // Respond with success
    res.status(201).json({ message: "Job posted successfully", job: savedJob });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Error posting job" });
  }
};



module.exports.getdetails = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Handle user not found case
    }

    // Assuming `user` has a `companyEmail` field linking to the `companies` table via email
    const companyEmail = user.email;

    // Now find the company details using the `companyEmail`
    const company = await Company.findOne({ email: companyEmail });

    if (!company) {
      return res.status(404).json({ message: "Company not found" }); // Handle company not found case
    }



    // Return the full company details
    return res.status(200).json({
      company: company,
    });
  } catch (error) {
    console.log("Error in getting company details at backend", error);
    return res
      .status(500)
      .json({ message: "Server error in fetching company details" }); // Handle errors
  }
};


module.exports.getCurrentjobs = async (req, res) => {
  try {
    const companyId = req.user.id;

 const today = new Date();
    const jobs = await Job.find({ company: companyId ,
      deadLine:{$gte:today}
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found" });
    }
    
    // const currentjobs = jobs.filter((job) => job.deadline >= today);

    return res.status(200).json({ jobs: jobs });
  } catch (error) {
    console.log("Error in getting current jobs at backend", error);
    return error;
  }
};


module.exports.getPreviousJobs = async (req, res) => {
  try {
    const companyId = req.user.id;

    const today = new Date();
    const jobs = await Job.find({
      company: companyId,
      deadLine: { $lt: today },
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found" });
    }

    // const currentjobs = jobs.filter((job) => job.deadline >= today);

    return res.status(200).json({ jobs: jobs });
  } catch (error) {
    console.log("Error in getting current jobs at backend", error);
    return error;
  }
};

module.exports.getApplications = async (req, res) => {
  try {
    const companyId = req.user.id;
    const jobId = req.params.jobId;

    // Find the company user by ID
    const user = await User.findById(companyId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has the role of 'company'
    const role = user.role;
    if (role !== "company") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this route" });
    }

    // Find the job by jobId
    const job = await Job.findById(jobId); // Await is required here to resolve the promise
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Get the applied array from the job document
    const appliedUsers = job.applied;

    // Fetch details of all users from the applied array
    const applicants = await Promise.all(
      appliedUsers.map(async (applicant) => {
        const userDetails = await User.findById(applicant.user).select(
          "name email experience highestEducation location skills resume.url"
        ); // Select specific fields like name and email
        return {
          user: userDetails,
          shortlisted: applicant.shortlisted,
          selected: applicant.selected,
        };
      })
    );

    console.log("applications", applicants);

    return res.status(200).json({ applicants });
  } catch (error) {
    console.log("Error in getting applications at backend", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.getUsersforCompany = async (req, res) => {
  try {
    const companyId = req.user.id;

    // Find the company based on the role and companyId
    const companyUser = await User.findOne({ role: "company", _id: companyId });
    if (!companyUser) {
      return res.status(400).json({ message: "Company not found" });
    }

    // Fetch jobs posted by the company from the Job model
    const jobs = await Job.find({ company: companyId }); // assuming "company" field references the companyId in Job model
    let appliedUserIds = [];

    console.log("jobs are", jobs);

    // Extract user IDs from applied field of each job
    jobs.forEach((job) => {
      if (job.applied && Array.isArray(job.applied)) {
        appliedUserIds = [...appliedUserIds, ...job.applied.map((a) => a.user)]; // assuming 'applied' contains user references
      }
    });

    console.log("applied user ids", appliedUserIds);

    if (appliedUserIds.length === 0) {
      return res.status(404).json({ message: "No applied users found" });
    }

    // Fetch user details for the applied users
    const appliedUsers = await User.find({ _id: { $in: appliedUserIds } });
    console.log("applied users", appliedUsers);

    return res.json({ users: appliedUsers });
  } catch (error) {
    console.log("Error in fetching users for company:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getDashboardData = async (req, res) => {
  try {
    const companyId = req.user.id;

    // Fetch the company user
    const companyUser = await User.findOne({ role: "company", _id: companyId });
    if (!companyUser) {
      return res.status(400).json({ message: "Company not found" });
    }

    // Fetch all jobs posted by this company
    const jobs = await Job.find({ company: companyId });

    // Total jobs posted
    const totalJobs = jobs.length;

    // Active jobs count (deadline is in the future)
    const activeJobs = jobs.filter(
      (job) => new Date(job.deadLine) >= new Date()
    );
    const activeJobsTotal = activeJobs.length;

    // Expired jobs count (deadline has passed)
    const expiredJobs = jobs.filter(
      (job) => new Date(job.deadLine) < new Date()
    );
    const expiredJobsTotal = expiredJobs.length;

    // Total applications for all jobs
    const totalApplications = jobs.reduce(
      (sum, job) => sum + (job.applied.length || 0),
      0
    );

    // Total cost for jobs (extracting numeric part from salary)
   const totalCost = jobs.reduce((sum, job) => {
     // Parse salary and remove any non-numeric characters
     const salary = parseFloat(job.salary.replace(/[^\d.-]/g, "")) || 0;
     // Multiply by the number of openings (default to 1 if not provided)
     const openings = job.numberOfOpenings || 1;
     return sum + salary * openings;
   }, 0);


    // Get all unique user IDs from applied users
      const applicantIds = new Set();
      jobs.forEach((job) => {
        job.applied.forEach((application) => {
          if (application.user) {
            applicantIds.add(application.user.toString());
          }
        });
      });
      const totalUniqueApplicants = applicantIds.size;

    // Send the result as a JSON response
    res.status(200).json({
      totalJobs,
      activeJobsTotal,
      expiredJobsTotal,
      totalApplications,
      totalCost,
      totalUniqueApplicants,
    });
  } catch (error) {
    console.log("Error in getting dashboard data in backend:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

module.exports.getTotalCost = async (req, res) => {
  try {
    const companyId = req.user.id;
    const company = await User.findById(companyId);
    const jobs = await Job.find({ company: companyId });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this company" });
    }

    // Calculate total cost and format job details
    const jobDetails = jobs.map((job) => {
      const salary = parseFloat(job.salary.replace(/[^\d.-]/g, "")) || 0;
      const totalSalaryForJob = salary * (job.numberOfOpenings || 1); // Default to 1 if numberOfOpenings is undefined

      return {
        jobRole: job.jobRole,
        jobType: job.jobType,
        numberOfOpenings: job.numberOfOpenings,
        salary: job.salary,
        totalSalaryForJob,
      };
    });

    // Sum total cost
    const totalCost = jobDetails.reduce(
      (sum, job) => sum + job.totalSalaryForJob,
      0
    );

    return res.status(200).json({
      totalCost: totalCost,
      jobs: jobDetails,
    });
  } catch (error) {
    console.log("Error in getting total cost in backend:", error);
    res
      .status(500)
      .json({ message: "Server error while calculating total cost" });
  }
};








