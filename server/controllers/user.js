const Job = require("../models/job"); // Import the Job model
const User = require("../models/user"); // Assuming you have a User model
const Company = require("../models/company");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");


module.exports.applyJob = async (req, res) => {
  const jobId = req.params.jobId; // Get job ID from request parameters
  const userId = req.user.id; // Get user ID from request body

  try {
    // Check if the user has already applied for the job
    const job = await Job.findOne({
      _id: jobId,
      applied: { $elemMatch: { user: userId } },
    });

    if (job) {
      // User has already applied
      return res
        .status(200)
        .json({ applied: true, message: "Already applied to this job" });
    } else {
      // User has not applied, proceed to apply for the job
      const newApplication = {
        user: userId,
        shortlisted: false,
        selected: false,
      };

      // Update the job by adding the new application to the applied array
      await Job.findByIdAndUpdate(jobId, {
        $push: { applied: newApplication },
      });

      // Add the job to the user's applied jobs
       await User.findByIdAndUpdate(
         userId,
         { $push: { jobs: { job: jobId } } }, // Automatically adds the current timestamp
         { new: true }
       );

      return res
        .status(201)
        .json({ applied: true, message: "Application submitted successfully" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error applying for the job", error });
  }
};


// module.exports.appliedJobs = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Find jobs that the user has applied for
//     const jobs = await Job.find({
//       applied: { $elemMatch: { user: userId } },
//     });

//     // If no jobs are found, return a 404 response
//     if (jobs.length === 0) {
//       return res.status(404).json({ message: "No jobs applied for" });
//     }

//     // Extract the company IDs from the jobs
//     const companyIds = jobs.map((job) => job.company); // Assuming each job has a company field

//     // Fetch the companies' data
//     const companies = await User.find({ _id: { $in: companyIds } });

//     // Map through jobs and attach company names
//     const jobsWithCompanyNames = jobs.map((job) => {
//       const company = companies.find(
//         (comp) => comp._id.toString() === job.company.toString()
//       );
//       return {
//         ...job.toObject(), // Convert Mongoose document to plain object
//         companyName: company ? company.name : "Company Not Found", // Safely access company name
//       };
//     });

//     return res.status(200).json({ jobs: jobsWithCompanyNames });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ message: "Error in getting applied jobs" });
//   }
// };


module.exports.appliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find jobs that the user has applied for
    const jobs = await Job.find({
      applied: { $elemMatch: { user: userId } },
    });

    // If no jobs are found, return a 404 response
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs applied for" });
    }

    // Extract the company IDs from the jobs
    const companyIds = jobs.map((job) => job.company); // Assuming each job has a company field

    // Fetch the companies' data
    const companies = await User.find({ _id: { $in: companyIds } });

    // Map through jobs and attach company names and applied dates
    const jobsWithDetails = jobs.map((job) => {
      // Find the applied entry for the current user
      const appliedEntry = job.applied.find(
        (entry) => entry.user.toString() === userId
      );
      const company = companies.find(
        (comp) => comp._id.toString() === job.company.toString()
      );

      return {
        ...job.toObject(), // Convert Mongoose document to plain object
        companyName: company ? company.name : "Company Not Found", // Safely access company name
        appliedDate: appliedEntry ? appliedEntry.appliedAt : "Date Not Found", // Access applied date
      };
    });

    return res.status(200).json({ jobs: jobsWithDetails });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error in getting applied jobs" });
  }
};


module.exports.bookmarkJob = async (req, res) => {
  try {
    const userId = req.user.id
    const jobId = req.params.jobId;

    // Find job and user by IDs
    const job = await Job.findById(jobId);
    const user = await User.findById(userId);

    // Check if job exists
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the job is already bookmarked by the user
    const alreadyBookmarked = user.bookmarkedJobs.some(
      (bookmark) => bookmark.job.toString() === jobId
    );

    if (alreadyBookmarked) {
      return res
        .status(200)
        .json({ bookmarked: true, message: "Job already bookmarked" });
    }

    // Add the job to the user's bookmarkedJobs array
    user.bookmarkedJobs.push({ job: jobId }); // Store job ID in the new structure
    await user.save(); // Save the updated user document

    return res
      .status(201)
      .json({ bookmarked: true, message: "Job bookmarked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error bookmarking job", error });
  }
};


module.exports.removeBookmark = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    // Use $pull with a condition to match the job field in the bookmarkedJobs array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarkedJobs: { job: jobId } } }, // Adjusted to pull based on the job field
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Bookmark removed successfully",
      bookmarkedJobs: user.bookmarkedJobs,
    });
  } catch (error) {
    console.error("Error in removing bookmark in backend", error);
    res.status(500).json({ message: "Failed to remove bookmark" });
  }
};






// module.exports.getAlljobs = async (req, res) => {
//   try {
//     const jobsWithCompanies = await Job.aggregate([
//       {
//         $lookup: {
//           from: "companies", // The name of the companies collection
//           localField: "company", // The field from the jobs collection
//           foreignField: "_id", // The field from the companies collection
//           as: "companyDetails", // The name of the new array field
//         },
//       },
//       {
//         // Optionally, you can choose to leave this out
//         $unwind: {
//           path: "$companyDetails",
//           preserveNullAndEmptyArrays: true, // Keep jobs even if no company matches
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           jobRole: 1,
//           jobDescription: 1,
//           workLocation: 1,
//           workMode: 1,
//           jobType: 1,
//           experience: 1, // Use the updated field name here
//           skills: 1, // Use the updated field name here
//           salary: 1,
//           duration: 1,
//           perks: 1,
//           qualifications: 1,
//           numberOfOpenings: 1,
//           jobstartDate: 1,
//           deadLine: 1,
//           name: { $ifNull: ["$companyDetails.CompanyName", "N/A"] }, // Handle missing company names
//           createdAt: 1,
//         },
//       },
//     ]);

//     console.log("job data", jobsWithCompanies);
    


//     res.json(jobsWithCompanies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

module.exports.getAlljobs = async (req, res) => {
  try {
    const jobsWithCompanyNames = await Job.aggregate([
      {
        $lookup: {
          from: "users", // The users collection
          localField: "company", // The company ID field in the jobs collection
          foreignField: "_id", // The _id field in the users collection
          as: "userDetails", // Name of the new array field for user details
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true, // Keep jobs even if no matching user is found
        },
      },
      {
        $project: {
          _id: 1,
          jobRole: 1,
          jobDescription: 1,
          workLocation: 1,
          workMode: 1,
          jobType: 1,
          experience: 1,
          skills: 1,
          salary: 1,
          duration: 1,
          perks: 1,
          qualifications: 1,
          numberOfOpenings: 1,
          jobstartDate: 1,
          deadLine: 1,
          name: { $ifNull: ["$userDetails.name", "N/A"] }, // Get company name from the users table
          createdAt: 1,
        },
      },
    ]);

    console.log("job data", jobsWithCompanyNames);

    res.json(jobsWithCompanyNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};






module.exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId; // Get job ID from route params

    // Find the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    console.log({
      jobData: job.toObject(), // Log job details
    });

    // Return the job data without combining it with company details
    return res.status(200).json({
      jobData: job.toObject(), // Only job details
    });
  } catch (error) {
    console.error("Error in getting job details by ID:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};



module.exports.getJobdata = async (req, res) => {
  try {
    // Get jobId from request parameters
    const { jobId } = req.params;

    // Find the job by ID and populate the company details
    const job = await Job.findById(jobId).populate();

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const userId = job.company;
    const user = await User.findById(userId);

    const company = await Company.find({email:user.email})

    // Send back both job and company data
    return res.status(200).json({
      job: job, // This includes all job details, and company details are populated
      company: company, // Directly access the populated company details
    });
  } catch (e) {
    console.log("Error in getting job data in controller:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.bookmarkedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user with bookmarked jobs and populate job details including company
    const user = await User.findById(userId).populate({
      path: "bookmarkedJobs.job",
      populate: {
        path: "company", // Assuming the Job model has a reference to Company
        model: "User", // Fetch from the User model where company info is stored
        select: "name", // Fetch the company name
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookmarkedData = user.bookmarkedJobs;

    // Check if user has any bookmarked jobs
    if (!bookmarkedData || bookmarkedData.length === 0) {
      return res.status(400).json({ message: "Bookmarks not found" });
    }

    // Format the bookmarked jobs with company name
    const jobsWithDetails = bookmarkedData.map((bookmark) => {
      const { job } = bookmark;
      return {
        ...job.toObject(), // Convert Mongoose document to plain object
        companyName: job.company ? job.company.name : "Company Not Found", // Safely access company name
      };
    });

    // Return the bookmarked jobs with company details
    return res.status(200).json({ jobs: jobsWithDetails });
  } catch (e) {
    console.error("Error in getting bookmarked jobs in controller:", e);
    return res
      .status(500)
      .json({ message: "Error retrieving bookmarked jobs" });
  }
};



module.exports.updateprofile = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      highestEducation,
      location,
      userExperience,
      userSkills,
      aboutYourself,
    } = req.body;

    // Check if the user exists
    const user = await User.findById(req.user.id); // Assuming req.user contains the logged-in user's info from fetchUser middleware
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user information
    user.name = userName;
    user.email = userEmail;
    user.highestEducation = highestEducation;
    user.location = location;
    user.experience = userExperience;
    user.skills = userSkills.split(",").map((skill) => skill.trim()); // Convert skills to an array
    user.aboutYourself = aboutYourself;

    // If a resume was uploaded, save its public ID and URL
    if (req.file) {
      user.resume.publicId = req.file.filename; // or req.file.public_id if using CloudinaryStorage
      user.resume.url = req.file.path; // or req.file.secure_url if using CloudinaryStorage
    }
    console.log("Resume URL:", user.resume.url);

    // Save the updated user
    await user.save();
    res.status(200).json({ msg: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};



