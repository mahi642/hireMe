import React, { useEffect, useState } from "react";
import "./CurrentJobs.css";
import CompanyMenubar from "../components/CompanyMenubar";
import { Grid, Box } from "@mui/joy";
import { Button, Paper } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PaidIcon from "@mui/icons-material/Paid";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  getCurrentJobsService,
  bookmarkJobService,
  getBookmarkJobsService,
  removeBookmarkJobService,
} from "../service/service";
import { useNavigate } from "react-router-dom";
const CurrentJobs = () => {
  const [currentJobs, setCurrentJobs] = useState([]);
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState(new Set());

 const fetchBookmarks = async () => {
   try {
     const res = await getBookmarkJobsService();
     console.log("res", res);

     // Check if res.jobs exists and is an array before proceeding
     if (res && Array.isArray(res.jobs)) {
       // Filter out any undefined `jobId` values
       const validJobIds = res.jobs
         .filter((job) => job && job._id)
         .map((job) => job._id);

       setBookmarkedJobIds(new Set(validJobIds));
     } else {
       console.warn("Unexpected structure in bookmark data:", res);
       setBookmarkedJobIds(new Set()); // Set an empty set if no jobs
     }
   } catch (error) {
     console.error("Error fetching bookmarks:", error);
     setBookmarkedJobIds(new Set()); // Clear bookmarks on error
   }
 };


  const fetchJobs = async () => {
    try {
      const response = await getCurrentJobsService();
      console.log("Fetched Jobs:", response.jobs);
      setCurrentJobs(response.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchBookmarks(); // Ensure bookmarks load first
      fetchJobs(); // Load jobs after
    };
    initializeData();
  }, []);

  const handleBookmarkToggle = async (jobId) => {
    try {
      if (bookmarkedJobIds.has(jobId)) {
        await removeBookmarkJobService(jobId);
        setBookmarkedJobIds((prev) => {
          const updated = new Set(prev);
          updated.delete(jobId);
          return updated;
        });
        alert("Bookmark removed successfully");
      } else {
        await bookmarkJobService(jobId);
        setBookmarkedJobIds((prev) => new Set(prev).add(jobId));
        alert("Job bookmarked successfully");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };
  console.log("bookmarks set",bookmarkedJobIds);
  

  const navigate = useNavigate();

  const handleClick = (jobId) => {
    navigate(`/company/job/${jobId}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <CompanyMenubar />
      <div className="company-jobs">
        <h1>Current Jobs</h1>
        <div className="company-jobs1">
          {currentJobs.length === 0 ? (
            <h1>No jobs available</h1>
          ) : (
            <Grid container spacing={2}>
              {currentJobs.map((job) => (
                <Grid item xs={12} md={6} lg={6} key={job._id}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                        {job.jobRole}
                      </p>
                      <div>
                        {bookmarkedJobIds.has(job._id) ? (
                          <BookmarkIcon
                            sx={{ fontSize: "2rem", color: "red" }}
                            onClick={() => handleBookmarkToggle(job._id)}
                          />
                        ) : (
                          <BookmarkBorderIcon
                            sx={{ fontSize: "2rem", color: "gray" }}
                            onClick={() => handleBookmarkToggle(job._id)}
                          />
                        )}
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <PaidIcon />
                        <p>{job.salary}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <PersonOutlineIcon />
                        <p>{job.applied.length} applicants</p>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Button
                        sx={{
                          backgroundColor: "aqua",
                          marginTop: "1rem",
                          color: "black",
                        }}
                        onClick={() => handleClick(job._id)}
                      >
                        Details
                      </Button>
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

export default CurrentJobs;
