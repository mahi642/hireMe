const mongoose = require("mongoose");
const Job = require("./job");

const jobSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
   
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
      lowercase: true, // Convert to lowercase before saving
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Email format validation
    },
    password: {
      type: String,
      required: true, // Password is required
      minlength: 6, // Minimum length of 6 characters
    },
    role: {
      type: String,
      enum: ["user", "admin", "company"],
      default: "user", // Default role
    },
    jobs: [jobSchema], // Jobs the user has applied for
    bookmarkedJobs: [jobSchema], // Jobs bookmarked by the user
    location: {
      type: String,
    },
    skills: {
      type: [String], // Array of strings for skills
    },
    experience: {
      type: Number,
    },
    aboutYourself: {
      type: String,
    },
    highestEducation: {
      type: String, // Corrected the spelling from highestEduction
    },
    logo: {
      publicId: {
        type: String,
        required: false, // Logo is not required initially
      },
      url: {
        type: String,
        required: false,
      },
    },
    resume: {
      publicId: {
        type: String,
        required: false, // Resume is not required initially
      },
      url: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

module.exports = User;
