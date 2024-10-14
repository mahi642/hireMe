import React from "react";
import { Paper, Button } from "@mui/material";
import { Grid } from "@mui/joy";
import { format } from "date-fns";
import "./BookmarkTemplate.css";
import { useNavigate } from "react-router-dom";

const BookmarkTemplate = ({ title, data }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/user/job/${id}`);
  };

  return (
    <div className="bookmarktemplate-container">
      <p
        style={{
          fontSize: "1.4rem",
          fontWeight: 900,
          margin: "1rem",
        }}
      >
        {title}
      </p>
      <Grid container spacing={2} className="bookmarktemplate-all-cards">
        {data && data.length > 0 ? (
          data.map((job) => (
            <Grid item md={6} lg={4} xs={12} key={job._id}>
              <Paper
                elevation={3}
                className="bookmarktemplate-card"
                sx={{
                  backgroundColor: "rgb(200, 120, 150)",
                }}
              >
                <div className="bookmarktemplate-card-top">
                  <div
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    Bookmarked On
                  </div>
                  <p className="bookmarktemplate-card-date">
                    {job.createdAt
                      ? format(new Date(job.createdAt), "dd MMM yyyy")
                      : "Date Unavailable"}
                  </p>
                </div>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "1rem",
                    backgroundColor: "rgb(217, 220, 240)",
                  }}
                >
                  <p className="bookmarktemplate-company-name">
                    {job.companyName || "Company Name Unavailable"}
                  </p>

                  <div className="bookmarktemplate-role">
                    <p className="bookmarktemplate-job-role">
                      {job.jobRole || "Job Role Unavailable"}
                    </p>
                  </div>
                </Paper>

                <div className="bookmarktemplate-card-bottom">
                  <div>
                    <p className="bookmarktemplate-salary">
                      ${job.salary || "Salary Not Listed"}
                    </p>
                  </div>

                  <Button
                    sx={{
                      backgroundColor: "#44cc11",
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
            <p>No bookmarked jobs available</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default BookmarkTemplate;
