const mongoose = require("mongoose");
const Job = require("./job")
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyLocation: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique: true, // To ensure no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  website:{
    type:"string",


  },
  companyDescription:{
    type:"string",
  },
  companyLogo:{
    type:"string",

  },

  numberOfEmployees: {
    type: Number,
    required: true,
    default: 50, // Default value if not provided
  },
  workCulture: {
    type: String, // Description of the company's work culture
    required: true,
    default: "Flexible", // Default value if not provided
  },
  facilitiesProvided: {
    type: [String], // List of facilities
    default: ["Wi-Fi", "Free Snacks"], // Default value if not provided
  },
  workStartTime: {
    type: String, // Work start time (can be stored as a string like "9:00 AM")
    required: true,
    default: "9:00 AM", // Default value if not provided
  },
  workEndTime: {
    type: String, // Work end time (can be stored as a string like "6:00 PM")
    required: true,
    default: "6:00 PM", // Default value if not provided
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Reference to the Job model
    },
  ],
},
{
  timestamps: true,
}
);



const Company = mongoose.model("Company", companySchema);
module.exports = Company;
