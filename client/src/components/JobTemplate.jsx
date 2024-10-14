import React from "react";
import { Paper, Button} from "@mui/material"; // Import Grid from Material-UI
import { Grid } from "@mui/joy"; // Import Grid from Material-UI
import { format } from "date-fns";
import "./JobTemplate.css";
import { useNavigate } from "react-router-dom";

const JobsTemplate = ({ title, data }) => {

  const navigate= useNavigate();

  const handleClick = (id)=>{
 navigate(`/user/job/${id}`);


  }

  return (
    <div className="jobtemplate-container">
      <p
        style={{
          fontSize: "1.4rem",
          fontWeight: 900,
          margin: "1rem",
        }}
      >
        {title}
      </p>
      <Grid container spacing={2} className="jobtemplate-all-cards">
        {" "}
        {/* Added Grid container */}
        {data && data.length > 0 ? (
          data.map((job) => (
            <Grid item md={6} lg={4} xs={12} key={job._id}>
              {" "}
              {/* Grid item for each card */}
              <Paper
                elevation={3}
                className="jobtemplate-card"
                sx={{
                  backgroundColor: "rgb(216, 115, 115)",
                }}
              >
                <div className="jobtemplate-card-top">
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "600",
                    }}
                  >
                    Applied On
                  </div>
                  <p className="jobtemplate-card-date">
                    {/* {job.appliedDate
                      ? format(new Date(job.date), "dd MMM yyyy")
                      : "Date Unavailable"} */}
                      27 august
                  </p>
                </div>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "1rem",
                    backgroundColor: "rgb(217, 220, 240);",
                  }}
                >
                  <p className="jobtemplate-company-name">
                    {job.companyName || "Company Name Unavailable"}
                  </p>

                  <div className="jobtemplate-role">
                    <p className="jobtemplate-job-role">
                      {job.jobRole || "Job Role Unavailable"}
                    </p>
                  </div>
                </Paper>

                <div className="jobtemplate-card-bottom">
                  <div>
                    <p className="jobtemplate-salary">
                      ${job.salary || "Salary Not Listed"}
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
                    onClick={() => handleClick(job._id)}
                  >
                    Details
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>No jobs available</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default JobsTemplate;
