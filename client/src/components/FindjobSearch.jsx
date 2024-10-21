import React, { useEffect, useState } from "react";
import "./jobsearch.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { Button, Slider } from "@mui/joy";
import { getAllJobs } from "../service/service";
import { Checkbox } from "@mui/joy";
import { Paper } from "@mui/material";
import { CiBookmark } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { bookmarkJobService } from "../service/service";
const FindjobSearch = () => {
 const [value, setValue] = useState([20, 37]);
 const [filters, setFilters] = useState({
   fullTime: false,
   partTime: false,
   internship: false,
   project: false,
   work: false,
   volunteering: false,
   fullDay: false,
   flexibleSchedule: false,
   shiftWork: false,
   remote: false,
 });
 const [search, setSearch] = useState({
 
   location: "",
   jobRole: "",
   experience: 0,
   duration: 0,
   salary: 0,
 });

 const navigate = useNavigate();

 const [jobData, setJobData] = useState([]);
 const [filteredJobs, setFilteredJobs] = useState([]); // To hold the filtered jobs

 useEffect(() => {
   const fetchJobs = async () => {
     try {
       const response = await getAllJobs(); // Call the service to fetch jobs
       console.log("Fetched jobs:", response);
       setJobData(response); // Set jobData to the fetched jobs
       setFilteredJobs(response); // Initialize filteredJobs with all jobs
     } catch (error) {
       console.error("Error fetching job data:", error); // Handle error
     }
   };

   fetchJobs(); // Fetch jobs when component mounts
 }, []);

 const handleChange1 = (event, newValue) => {
   setValue(newValue);
 };

 const handleChange = (event) => {
   const updatedFilters = {
     ...filters,
     [event.target.name]: event.target.checked,
   };
   setFilters(updatedFilters);
 };

 const handleSearchChange = (event) => {
   const { name, value } = event.target;
   setSearch((prevState) => ({
     ...prevState,
     [name]: value,
   }));
 };

 // Helper function to apply filters
 const applyFilters = (jobs) => {
   const filterConditions = {
     fullTime: (job) => job.jobType === "Full-Time",
     partTime: (job) => job.jobType === "Part Time",
     internship: (job) => job.jobType === "Internship",
     project: (job) => job.jobType === "Project",
     work: (job) => job.jobType === "Work",
     volunteering: (job) => job.jobType === "Volunteering",
     fullDay: (job) => job.employmentType === "Full Day",
     flexibleSchedule: (job) => job.employmentType === "Flexible Schedule",
     shiftWork: (job) => job.employmentType === "Shift Work",
     remote: (job) => job.workMode === "Remote",
   };

   // Apply filters conditionally
   return jobs.filter((job) =>
     Object.entries(filters).every(([filterName, isActive]) => {
       return !isActive || filterConditions[filterName](job);
     })
   );
 };

 useEffect(() => {
   const applyFiltersAndSearch = () => {
     let filtered = applyFilters(jobData); // First apply the filters

     // Apply search criteria
     filtered = filtered.filter((job) => {
     const matchJobRoleOrCompany = search.jobRole
       ? job.jobRole?.toLowerCase().includes(search.jobRole.toLowerCase()) ||
         job.name?.toLowerCase().includes(search.jobRole.toLowerCase())
       : true;


       const matchLocation = search.location
         ? job.workLocation
             ?.toLowerCase()
             .includes(search.location.toLowerCase())
         : true;
       const matchExperience = search.experience
         ? job.experience <= search.experience
         : true;
       const matchDuration = search.duration
         ? job.duration <= search.duration
         : true;
       const matchSalary = search.salary
         ? job.salary && job.salary >= search.salary
         : true;

       return (
         matchJobRoleOrCompany &&
         matchLocation &&
         matchExperience &&
         matchDuration &&
         matchSalary
       );
     });

     setFilteredJobs(filtered);
   };

   applyFiltersAndSearch(); // Apply filters and search whenever filters, search, or jobData changes
 }, [filters, search, jobData]);

 const handleDetails = (id) => {
   navigate(`/user/job/${id}`); // Use template literal to insert the job ID
 };

 const handleBookmark = async (id) => {
   const result = await bookmarkJobService(id);
   if (!result) {
     alert("Failed to bookmark");
   } else {
     alert("Bookmarked successfully");
   }

   console.log("bookmarked job id:", id);
 };

 // Log filtered jobs and filters for debugging purposes
 useEffect(() => {
   console.log("Updated filters:", filters);
   console.log("Filtered jobs:", filteredJobs);
 }, [filters, filteredJobs]);

  return (
    <div className="jobsearch">
      <div className="search">
        <SearchOutlinedIcon sx={{ borderRadius: "50%" }} />
        <input
          className="search-input"
          placeholder="Role"
          name="jobRole"
          value={search.jobRole}
          onChange={handleSearchChange}
        />
        <p>|</p>
        <LocationOnOutlinedIcon />
        <input
          className="search-input"
          placeholder="Location"
          name="location"
          value={search.location}
          onChange={handleSearchChange}
        />
        <p>|</p>
        <WorkHistoryOutlinedIcon />
        <input
          className="search-input"
          placeholder="Experience in years"
          name="experience"
          value={search.experience}
          onChange={handleSearchChange}
        />
        <p>|</p>
        <DateRangeOutlinedIcon />
        <input
          className="search-input"
          placeholder="Job duration in years"
          name="duration"
          value={search.duration}
          onChange={handleSearchChange}
        />
        <p>|</p>
        <div>
          <div style={{ display: "flex" }}>
            <p>Salary range</p>
            <p>{`${value[0]}$ - ${value[1]}$`}</p>
          </div>
          <Slider
            value={value}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            name="salary"
            onChangeCommitted={(event, newValue) => {
              setSearch((prev) => ({
                ...prev,
                salary: newValue, // Use both values to represent the salary range
              }));
              applyFilters(filters);
            }}
          />
        </div>
      </div>

      <hr style={{ width: "100%", height: "0.5px", backgroundColor: "grey" }} />

      <div className="find-bottom">
        <div
          style={{
            width: "28%",
          }}
        >
          <div className="jobs-filter">
            <img src="/jobs.svg" alt="jobs pic" />
            <button className="learn-more-btn">Learn More</button>
          </div>
          <p>Filters</p>

          <div className="filter-options">
            <p
              style={{
                color: "rgba(188, 176, 176, 1)",
                fontWeight: "900",
                marginTop: "1rem",
              }}
            >
              Working Schedule
            </p>
            <label>
              <Checkbox
                className="filter-options1"
                name="fullTime"
                checked={filters.fullTime}
                onChange={handleChange}
              />
              Full Time
            </label>
            <label>
              <Checkbox
                className="filter-options1"
                name="partTime"
                checked={filters.partTime}
                onChange={handleChange}
              />
              Part Time
            </label>
            <label>
              <Checkbox
                className="filter-options1"
                name="internship"
                checked={filters.internship}
                onChange={handleChange}
              />
              Internship
            </label>
            <label>
              <Checkbox
                className="filter-options1"
                name="project"
                checked={filters.project}
                onChange={handleChange}
              />
              Project
            </label>
            <label>
              <Checkbox
                className="filter-options1"
                name="work"
                checked={filters.work}
                onChange={handleChange}
              />
              Work
            </label>
            <label>
              <Checkbox
                className="filter-options1"
                name="volunteering"
                checked={filters.volunteering}
                onChange={handleChange}
              />
              Volunteering
            </label>
          </div>

          <div className="filter-options">
            <p
              style={{
                color: "rgba(188, 176, 176, 1)",
                fontWeight: "900",
                marginTop: "1rem",
              }}
            >
              Employment Type
            </p>
            <label>
              <Checkbox
                className="filter-options1"
                name="fullDay"
                checked={filters.fullDay}
                onChange={handleChange}
              />
              Full Day
            </label>
            <label>
              <Checkbox
                className="filter-options1"
                name="flexibleSchedule"
                checked={filters.flexibleSchedule}
                onChange={handleChange}
              />
              Flexible Schedule
            </label>
            <label>
              <Checkbox
                className="filter-options1"
                name="shiftWork"
                checked={filters.shiftWork}
                onChange={handleChange}
              />
              Shift Work
            </label>
            <label>
              <Checkbox
                className="filter-options1"
                name="remote"
                checked={filters.remote}
                onChange={handleChange}
              />
              Remote
            </label>
          </div>
        </div>

        <div
          style={{
            width: "95%",
          }}
        >
          <div
            style={{
              margin: "1rem auto",
            }}
          >
            <p className="bottom-text">Popular jobs</p>
            <div className="all-cards">
              {filteredJobs.map((job) => (
                <Paper
                  key={job._id}
                  elevation={3}
                  sx={{
                    backgroundColor: "white",
                    height: "20rem",
                    width: "18rem",
                    alignContent: "top",
                    padding: "8px",
                    borderRadius: "0.5rem",
                    margin: "0.3rem",
                  }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      backgroundColor: "#d4f7ed",
                      height: "75%",
                      width: "100%",
                      margin: "0 auto",
                      borderRadius: "0.5rem",
                      padding: "0 0.5rem",
                    }}
                  >
                    <div className="card-top">
                      <p className="card-date">
                        {job.createdAt
                          ? format(new Date(job.createdAt), "dd MMM")
                          : "Date Unavailable"}
                      </p>
                      <CiBookmark
                        style={{
                          fontSize: "30",
                          marginTop: "1rem",
                          backgroundColor: "white",
                          borderRadius: "0.5rem",
                        }}
                        onClick={() => handleBookmark(job._id)}
                      />
                    </div>

                    <p style={{ fontWeight: 900, margin: "8px 0 0 1rem" }}>
                      {job.name || "Company Name Unavailable"}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: "18px", fontWeight: 700 }}>
                        {job.jobRole || "Job Role Unavailable"}
                      </p>
                      <FcGoogle
                        style={{
                          fontSize: "30",
                          backgroundColor: "white",
                          borderRadius: "0.9rem",
                        }}
                      />
                    </div>

                    <div
                      className="card-data"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      {job.skills?.length > 0 ? (
                        job.skills.map((skill, skillIndex) => (
                          <p key={skillIndex} style={{ marginRight: "0.5rem" }}>
                            {skill}
                          </p>
                        ))
                      ) : (
                        <p>No skills listed</p>
                      )}
                    </div>
                  </Paper>

                  <div
                    className="card-bottom"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <div>
                      <p style={{ color: "black", fontWeight: "700" }}>
                        ${job.salary || "Salary Not Listed"}
                      </p>
                      <p style={{ color: "grey" }}>
                        {job.workLocation || "Location Not Specified"}
                      </p>
                    </div>

                    <Button
                      sx={{
                        backgroundColor: "#00c853",
                        color: "white",
                        width: "7rem",
                        borderRadius: "5rem",
                        "&:hover": {
                          backgroundColor: "#00e676",
                        },
                      }}
                      onClick={() => handleDetails(job._id)}
                    >
                      Details
                    </Button>
                  </div>
                </Paper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindjobSearch;
