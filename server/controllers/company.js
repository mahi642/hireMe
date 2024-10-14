const Job = require("../models/job"); // Import the Job model
const Company = require("../models/company"); // Import the Company model
const User = require("../models/user")
module.exports.postjob = async (req, res) => {
  try {
    const companyId = req.user.id; // Assuming the company ID comes from the logged-in user
    console.log("companyId", companyId);

    const user = await User.findById(companyId);
    if (!user || user.role !== "company") {
      return res
        .status(404)
        .json({ message: "User not found or not a company" });
    }

    const email = user.email; // Get the email from the user
    console.log("User email:", email);

    // Destructure the job details from the request body
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

    // Create a new job object
    const job = new Job({
      jobRole,
      workLocation,
      workMode,
      jobType,
      experience,
      skills: skills.split(", "), // Convert skills string to array
      salary,
      duration,
      perks: perks.split(", "), // Convert perks string to array
      jobDescription,
      qualifications,
      numberOfOpenings,
      jobstartDate,
      deadLine,
      company: companyId, // Link job to the logged-in company
    });

    // Save the job to the database
    const savedJob = await job.save();

    // Update the company to include the new job reference

    const company = await Company.findOne({ email: email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Update the company to include the new job reference
    company.jobs.push(savedJob._id); // Push the job ID into the jobs array
    await company.save(); // Save the updated company document

    await User.findByIdAndUpdate(
      companyId,
      { $push: { jobs: savedJob._id } }, // Push the job ID into the jobs array
      { new: true } // Return the updated document
    );

    // Respond with success
    res.status(201).json({ message: "Job posted successfully", job: savedJob });
  } catch (error) {
    console.error(error);
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

