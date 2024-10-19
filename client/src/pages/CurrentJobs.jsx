import React, { useEffect, useState } from "react";
import "./CurrentJobs.css";
import CompanyMenubar from "../components/CompanyMenubar";
import { Grid, Box } from "@mui/joy";
import { Button, Paper } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PaidIcon from "@mui/icons-material/Paid";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { getCurrentJobsService } from "../service/service";
import { useNavigate } from "react-router-dom";
const CurrentJobs = () => {
  const [currentJobs, setCurrentJobs] = useState([]); // State to store current jobs

  const fetchdata = async () => {
    try {
      const response = await getCurrentJobsService();
      console.log(response);
      setCurrentJobs(response.jobs); // Update state with fetched jobs
    } catch (error) {
      console.error("Error fetching jobs:", error); // Handle any errors
    }
  };

  useEffect(() => {
    fetchdata(); // Call fetchdata on component mount
  }, []); // Correctly use an empty dependency array



  const navigate = useNavigate();

  const handleClick = (jobId) => {
    // Define your handleClick function
    console.log(`Job ID clicked: ${jobId}`);
    navigate(`/company/job/${jobId}`)
    
  };

  return (
    <div style={{ display: "flex" }}>
      <CompanyMenubar />
      <div className="company-jobs">
        <h1>Current Jobs</h1>
        <div className="company-jobs1">
          {currentJobs.length === 0 ? ( // Check if there are no jobs
            <h1>No jobs available</h1> // Display message if no jobs
          ) : (
            <Grid container spacing={2}>
              {currentJobs.map(
                (
                  job // Map through currentJobs to render job cards
                ) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    key={job._id}
                    onClick={() => handleClick(job._id)}
                  >
                    <Paper elevation={3} sx={{ padding: 2 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            backgroundColor: "aqua",
                            padding: "1rem 2rem",
                            textAlign: "center",
                            fontSize: "1.2rem",
                            borderRadius: "0.7rem",
                            width: "90%",
                          }}
                        >
                          {job.jobRole} {/* Assuming job has a jobRole field */}
                        </p>
                        <div>
                          <BookmarkBorderIcon
                            sx={{
                              fontSize: "2rem",
                            }}
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.2rem 2rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <PaidIcon />
                          <p>{job.salary}</p>{" "}
                          {/* Assuming job has a salary field */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <PersonOutlineIcon />
                          <p>{job.applied.length} applicants</p>{" "}
                          {/* Assuming job has an applicants field */}
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Button
                          sx={{
                            backgroundColor: "aqua", // Change color as needed
                            marginTop: "1rem",
                            color: "black",
                          }}
                        >
                          Details
                        </Button>
                      </div>
                    </Paper>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </div>
      </div>
    
    </div>
  );
};

export default CurrentJobs;
