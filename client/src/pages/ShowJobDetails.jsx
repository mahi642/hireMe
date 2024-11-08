import React, { useEffect, useState } from "react";
import "./ShowJobDetails.css";
import CompanyMenubar from "../components/CompanyMenubar";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import { Grid ,Button} from "@mui/joy";
import { jobDetailsService } from "../service/service";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
const ShowJobDetails = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  // Fetch job details from the backend
  const jobdata = async () => {
    try {
      const response = await jobDetailsService(jobId);
      if (!response || !response.job) {
        console.log("No data found");
      } else {
        setJobDetails(response.job);
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    jobdata();
  }, [jobId]);


const navigate = useNavigate();



  const handleClick =()=>{
    navigate(`/company/applications/${jobId}`)

  }
  return (
    <div style={{ display: "flex" }}>
      <CompanyMenubar />

      <div style={{ padding: "2rem", width: "100%" }}>
        <div
          style={{
            padding: "2rem",
            border: "1px solid white",
            width: "100%",
            borderRadius: "1rem",
          }}
        >
          <h1>Job Details</h1>

          <Grid container spacing={2} alignItems="stretch">
            {/* Left part - Main Job Information */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  padding: "1rem",
                  backgroundColor: "#bbf5f5",
                  boxShadow: 3,
                  height: "100%", // Ensure Paper fills the full height
                }}
              >
                {jobDetails ? (
                  <>
                    <div>
                      <p
                        style={{
                          fontSize: "1.6rem",
                          textAlign: "center",
                          fontFamily: "Times",
                          fontWeight: 800,
                        }}
                      >
                        {jobDetails.jobRole}
                      </p>
                    </div>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: "2rem",
                        margin: " 0",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: "1.5rem",
                            fontFamily: "Times",
                          }}
                        >
                          Job Description
                        </p>
                        <p
                          style={{}}
                          className="job-value"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              jobDetails.jobDescription ||
                                "<p>Description not available</p>"
                            ),
                          }}
                        ></p>
                      </div>

                      <div>
                        <p
                          style={{
                            fontSize: "1.5rem",
                            fontFamily: "Times",
                            marginTop: "1rem",
                          }}
                        >
                          Job Qualification
                        </p>
                        <p
                          className="job-value"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              jobDetails.qualifications||
                                "<p>Description not available</p>"
                            ),
                          }}
                        ></p>
                      </div>

                      <div>
                        <p
                          style={{
                            fontSize: "1.5rem",
                            fontFamily: "Times",
                            marginTop: "1rem",
                          }}
                        >
                          Skills
                        </p>

                        <div className="job-skills">
                          {jobDetails.skills.map((skill, index) => (
                            <p key={index}>{skill}</p>
                          ))}
                        </div>
                      </div>
                    </Paper>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        margin: "0 auto",
                      }}
                    >
                      <Paper
                        elevation={3}
                        style={{
                          padding: "2rem 1.9rem",
                          margin: "0.2rem 0.5rem",
                        }}
                      >
                        <p className="job-title">Job Type</p>
                        <p className="job-value">{jobDetails.jobType}</p>
                      </Paper>
                      <Paper
                        style={{
                          padding: "2rem 1.9rem",
                          margin: "0.1rem 0.5rem",
                        }}
                      >
                        <p className="job-title">Salary</p>
                        <p className="job-value">{jobDetails.salary}</p>
                      </Paper>
                      <Paper
                        style={{
                          padding: "2rem 2.1rem",
                          margin: "0.2rem 0.5rem",
                        }}
                      >
                        <p className="job-title">Experience</p>
                        <p className="job-value">{jobDetails.experience}</p>
                      </Paper>
                    </div>
                  </>
                ) : (
                  <p>Loading job details...</p>
                )}
              </Paper>
            </Grid>

            {/* Right part - Additional Details */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: "1rem",
                  backgroundColor: "#bbf5f5",
                  boxShadow: 3,
                  height: "100%", // Ensure Paper fills the full height
                }}
              >
                {jobDetails ? (
                  <>
                    <div>
                      <p
                        style={{
                          fontSize: "1.5rem",
                          fontFamily: "Times",
                          fontWeight: 700,
                          marginBottom: "2.4rem",
                        }}
                      >
                        Additional Details
                      </p>

                      {/* Workmode Section */}
                      <Paper
                        elevation={3}
                        sx={{ padding: "1rem", margin: "1.4rem 0" }}
                      >
                        <p className="job-title">Work Mode</p>
                        <p className="job-value">{jobDetails.workMode}</p>
                      </Paper>

                      {/* Perks Section */}
                      <Paper
                        elevation={3}
                        sx={{ padding: "1rem", margin: "1.4rem 0" }}
                      >
                        <p className="job-title">Perks</p>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {jobDetails.perks.map((perk, index) => (
                            <p
                              style={{
                                margin: "0.2rem",
                                backgroundColor: "rgb(167, 159, 159)",
                                padding: "0.5rem 1rem",
                                borderRadius: "0.5rem",
                                fontSize: "11px",
                              }}
                              key={index}
                            >
                              {perk}
                            </p>
                          ))}
                        </div>
                      </Paper>

                      {/* Deadline Section */}
                      <Paper
                        elevation={3}
                        sx={{ padding: "1rem", margin: "1.4rem 0" }}
                      >
                        <p className="job-title">Application Deadline</p>
                        <p className="job-value">
                          {new Date(jobDetails.deadLine).toLocaleDateString()}
                        </p>
                      </Paper>

                      {/* Start Date Section */}
                      <Paper
                        elevation={3}
                        sx={{ padding: "1rem", margin: "1.4rem 0" }}
                      >
                        <p className="job-title">Start Date</p>
                        <p className="job-value">
                          {new Date(
                            jobDetails.jobstartDate
                          ).toLocaleDateString()}
                        </p>
                      </Paper>
                      <img
                        src={"/hireme3.png"}
                        alt="pic"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <p>Loading additional details...</p>
                )}
              </Paper>
            </Grid>
          </Grid>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              onClick={handleClick}
              sx={{
                backgroundColor: "#8877ff",
                color: "black",
              }}
            >
              See Applicants
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowJobDetails;
