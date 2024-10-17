import React, { useEffect, useState } from "react";
import "./PreviousJobs.css"; // Make sure to create a CSS file for styling if needed
import CompanyMenubar from "../components/CompanyMenubar";
import { Grid, Box } from "@mui/joy";
import { Button, Paper } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PaidIcon from "@mui/icons-material/Paid";
import { getPreviousJobsService } from "../service/service"; // Ensure this service is defined
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const PreviousJobs = () => {
  const [previousJobs, setPreviousJobs] = useState([]); // State to store previous jobs

  const fetchdata = async () => {
    try {
      const response = await getPreviousJobsService(); // Fetch previous jobs
      console.log(response);
      setPreviousJobs(response.jobs); // Update state with fetched jobs
    } catch (error) {
      console.error("Error fetching previous jobs:", error); // Handle any errors
    }
  };

  useEffect(() => {
    fetchdata(); // Call fetchdata on component mount
  }, []); // Correctly use an empty dependency array

  const handleClick = (jobId) => {
    // Define your handleClick function
    console.log(`Job ID clicked: ${jobId}`);
    // You can also navigate to a different page or perform other actions here
  };

  return (
    <div style={{ display: "flex" }}>
      <CompanyMenubar />
      <div className="company-jobs">
        <h1>Previous Jobs</h1>
        <div className="company-jobs1">
          {previousJobs.length === 0 ? ( // Check if there are no previous jobs
            <h1>No previous jobs available</h1> // Display message if no jobs
          ) : (
            <Grid container spacing={2}>
              {previousJobs.map(
                (
                  job // Map through previousJobs to render job cards
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
                            backgroundColor: "grey", // You can change this color
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
                            backgroundColor: "darkgrey",

                            marginTop: "1rem",
                            color:"black"
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

export default PreviousJobs;
