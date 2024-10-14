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

const userSchema = mongoose.Schema(
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
    jobs: [jobSchema],
    bookmarkedJobs: [jobSchema],
  },
  { timestamps: true }
); // Automatically create createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

module.exports = User; // Export the User model
