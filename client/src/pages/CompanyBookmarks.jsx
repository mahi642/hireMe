import React, { useState, useEffect } from "react";
import CompanyMenubar from "../components/CompanyMenubar";
import {
  getBookmarkJobsService,
  removeBookmarkJobService,
} from "../service/service";
import { Paper, Typography, Grid, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaidIcon from "@mui/icons-material/Paid";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./CompanyBookmarks.css";

const CompanyBookmarks = () => {
  const [data, setData] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const response = await getBookmarkJobsService();
      if (response && response.jobs) {
        setData(response.jobs);
      }
    } catch (error) {
      console.error("Error fetching bookmarked jobs:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (jobId) => {
    try {
      const response = await removeBookmarkJobService(jobId);
      if (response.success) {
        // Update state immediately to reflect the change
        setData((prevData) => prevData.filter((job) => job._id !== jobId));
        // Optionally, refetch bookmarks to ensure you have the latest data
        // fetchBookmarks();
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <CompanyMenubar />
      <div style={{ padding: "2rem", width: "100%" }}>
        <h1 style={{ color: "#FFFFFF" }}>Company Bookmarks</h1>
        <div
          style={{
            border: "1px solid #333",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          {data.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center">
              No bookmarks available
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {data.map((job) => (
                <Grid item xs={12} md={6} key={job._id}>
                  <Paper
                    elevation={4}
                    sx={{
                      padding: "1.5rem",
                      backgroundColor: "#1e1e1e",
                      borderRadius: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#E0E0E0" }}>
                        {job.jobRole}
                      </Typography>
                      <IconButton onClick={() => handleRemoveBookmark(job._id)}>
                        <BookmarkIcon sx={{ color: "#FFD700" }} />
                      </IconButton>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.5rem",
                        color: "#B0BEC5",
                      }}
                    >
                      <LocationOnIcon sx={{ marginRight: "0.3rem" }} />
                      <Typography variant="body1">
                        {job.workLocation}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#B0BEC5",
                      }}
                    >
                      <PaidIcon sx={{ marginRight: "0.3rem" }} />
                      <Typography variant="body1">{job.salary}</Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.5rem",
                        color: "#90A4AE",
                      }}
                    >
                      <BookmarkIcon
                        sx={{ marginRight: "0.3rem", color: "#90CAF9" }}
                      />
                      <Typography variant="body2">
                        Bookmarked on:{" "}
                        {new Date(job.createdAt).toLocaleDateString()}
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};



export default CompanyBookmarks;
