import React, { useEffect, useState } from "react";
import "./PreviousJobs.css";
import CompanyMenubar from "../components/CompanyMenubar";
import { Grid } from "@mui/joy";
import { Button, Paper } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PaidIcon from "@mui/icons-material/Paid";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  getPreviousJobsService,
  bookmarkJobService,
  getBookmarkJobsService,
  removeBookmarkJobService,
} from "../service/service";
import { useNavigate } from "react-router-dom";

const PreviousJobs = () => {
  const [previousJobs, setPreviousJobs] = useState([]);
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState(new Set());

  const fetchBookmarks = async () => {
    try {
      const res = await getBookmarkJobsService();
      if (res && Array.isArray(res.jobs)) {
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

  const fetchdata = async () => {
    try {
      const response = await getPreviousJobsService();
      setPreviousJobs(response.jobs);
    } catch (error) {
      console.error("Error fetching previous jobs:", error);
    }
  };

  useEffect(() => {
    fetchdata();
    fetchBookmarks();
  }, []);

  const toggleBookmark = async (jobId) => {
    try {
      if (bookmarkedJobIds.has(jobId)) {
        await removeBookmarkJobService(jobId);
        setBookmarkedJobIds((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(jobId);
          return updatedSet;
        });
      } else {
        await bookmarkJobService(jobId);
        setBookmarkedJobIds((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.add(jobId);
          return updatedSet;
        });
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const navigate = useNavigate();

  const handleClick = (jobId) => {
    navigate(`/company/job/${jobId}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <CompanyMenubar />
      <div className="company-jobs">
        <h1>Previous Jobs</h1>
        <div className="company-jobs1">
          {previousJobs.length === 0 ? (
            <h1>No previous jobs available</h1>
          ) : (
            <Grid container spacing={2}>
              {previousJobs.map((job) => (
                <Grid item xs={12} md={6} lg={6} key={job._id}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p
                        style={{
                          backgroundColor: "grey",
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
                            sx={{
                              fontSize: "2rem",
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={() => toggleBookmark(job._id)}
                          />
                        ) : (
                          <BookmarkBorderIcon
                            sx={{ fontSize: "2rem", cursor: "pointer" }}
                            onClick={() => toggleBookmark(job._id)}
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
                          backgroundColor: "darkgrey",
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

export default PreviousJobs;
