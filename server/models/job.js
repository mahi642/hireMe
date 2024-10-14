const mongoose = require("mongoose");
const Company = require("./company"); // Assuming company model is defined elsewhere
const User = require("./user"); // Import user model if necessary

const jobSchema = new mongoose.Schema(
  {
    jobRole: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    workLocation: {
      type: String,
      required: true,
    },
    workMode: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"], // Enum for work mode
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Internship", "Part-Time", "Volunteer"], // Enum for job type
      required: true,
    },
    experience: {
      type: String, // Changed from Number to String as per the input "3-5 years"
      required: true,
    },
    skills: {
      type: [String], // Changed to an array of strings for multiple skills
      required: true,
    },
    salary: {
      type: String, // Changed to String to accommodate the range "80,000-100,000 USD"
      required: true,
    },
    duration: {
      type: String, // Changed to String as "Permanent" doesn't fit a typical enum
      required: true,
    },
    perks: {
      type: [String], // Array of perks
    },
    qualifications: {
      type: String,
      required: true,
    },
    numberOfOpenings: {
      type: Number,
    },
    jobstartDate: {
      type: Date,
    },
    deadLine: {
      type: Date,
    },
    applied: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user", // Reference to the user model
          required: true,
        },
        shortlisted: {
          type: Boolean, // Indicates if the user is shortlisted
          default: false,
        },
        selected: {
          type: Boolean, // Indicates if the user is selected
          default: false,
        },
        appliedDate: {
          type: Date, 
          default:Date.now
        },

        
      },
    ], // Array of applied users with status
  },
  {
    timestamps: true, // Enable timestamps
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
