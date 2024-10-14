import { useParams } from "react-router-dom";
import "./Job.css";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper, Box, Button } from "@mui/material";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import HourglassTopSharpIcon from "@mui/icons-material/HourglassTopSharp";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import WorkHistorySharpIcon from "@mui/icons-material/WorkHistorySharp";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import { FcBookmark } from "react-icons/fc";
import { useEffect, useState } from "react";
import { jobDetailsService, applyJobService } from "../service/service";
import CongratulationBlast  from "../components/CongratulationBlast";
import ConfettiExplosion from "react-confetti-explosion";

const Job = () => {
  const { jobId } = useParams();

  console.log(jobId);
   const [isApplied, setIsApplied] = useState(false);
  const [details, setDetails] = useState({
    companyName: "",
    comapnyLocation: "",
    companyWebsite: "https://cloud.google.com/?hl=en",
    numberOfEmployees: "",
    companyDescription: "",
    facilitiesAtCompany: "",
    companyRecuritingSince: "",
    companyHired: "",
    numberOfRolesPosted: "",

    jobTitle: "",
    jobDescription: "",

    jobType: "",
    workMode: "",
    skills: "",
    jobRequirements: "",
    perks: "",

    jobSalary: "",
    jobDuration: "",
    deadLine: "",
    jobStartDate: "",
  });

  function formatDate(isoDate) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", options);
  }
  function foramtDate1(isDate) {
    const options = { month: "long", year: "numeric" };
    const date = new Date(isDate);
    return date.toLocaleDateString("en-GB", options);
  }

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        const result = await jobDetailsService(jobId);
        console.log("Service response:", result);
        setResponse(result);
      } catch (error) {
        console.error("Failed to fetch job and company details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      getDetails();
    }
  }, [jobId]); // Runs when jobId changes

  const handleApply = async (e) => {
    e.preventDefault();

    try {
      const result = await applyJobService(jobId);
      console.log("applied job", result);
      // alert("Applied suucessfulyy");

      setIsApplied(true); // Trigger the confetti when the apply button is clicked

      // Optional: Set a timeout to hide the confetti after 5 seconds
      setTimeout(() => setIsApplied(false), 5000);

    } catch (error) {
      console.error("Error applying for the job:", error);
      alert("failed to apply")
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!response) {
    return <p>No data found.</p>; // Handle case where response is null
  }

  return (
    <div>
      <p className="job-head">
        {" "}
        {response.job.jobRole} at {response.company[0].name}
      </p>

      <div className="job-details">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p className="job-role">{response.job.jobRole}</p>
            <p className="company-name">{response.company[0].name}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocationOnIcon /> {response.company[0].companyLocation}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="job"
            style={{
              backgroundColor: "grey",
            }}
          >
            <HomeIcon />
            <p style={{ margin: "0 0 0 8px" }}>{response.job.jobType}</p>{" "}
          </div>
          <FcBookmark
            style={{
              fontSize: "35",
              backgroundColor: "white",
              borderRadius: "1rem",
            }}
          />
        </div>

        <div className="about-company">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "29px",
                marginBottom: "1rem",
              }}
            >
              About {response.company[0].name}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PeopleAltIcon /> {response.company[0].numberOfEmployees}{" "}
              Employees
            </div>
          </div>

          <p
            style={{
              fontSize: "20px",
              marginBottom: "5px",
            }}
          >
            {response.company[0].companyDescription}
          </p>

          <a
            href={response.company[0].website}
            target="_blank"
            style={{
              color: "#bb6077",
            }}
          >
            company's website
          </a>
          <div>
            <p
              style={{
                fontSize: "1.5rem",
                marginTop: "1.5rem",
              }}
            >
              Facilities provided at company
            </p>
            <div className="job">
              {response.company[0]?.facilitiesProvided?.map(
                (facility, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "1rem 0.2rem",
                      backgroundColor: "grey",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    <HomeIcon />
                    <p style={{ margin: "0 0 0 8px" }}>{facility}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="job-part">
          
          <div className="abt-job1">
            <p className="job-headings">About the Role</p>

            <p
              style={{
                fontSize: "1.1rem",
              }}
            >
              {response.job.jobDescription}
            </p>

            <p className="job-headings">Skills Required</p>
            <div className="skill-tags">
              {response.job.skills?.map((skill, index) => (
                <p key={index} className="skill-tag">
                  {skill}
                </p>
              ))}
            </div>

            <div>
              <p className="job-headings">Requiremnts for the job</p>
              <p>{response.job.qualifications}</p>
            </div>

            <div>
              <p className="job-headings">Perks you get</p>
              <div className="job-perks">
                {response.job.perks?.map((skill, index) => (
                  <p key={index} className="job-perk">
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="abt-job2">
            <div>
              <Paper
                elevation={4}
                sx={{
                  width: "70%",
                  padding: "1rem 0.5rem",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WorkOutlineIcon />
                    Job Type
                  </div>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      textAlign: "center",
                    }}
                  >
                    {response.job.jobType}
                  </p>
                </div>
              </Paper>
              <Paper
                elevation={4}
                sx={{
                  width: "70%",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  margin: "1rem auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WorkHistoryRoundedIcon /> &nbsp; Job Start Date
                </div>
                <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {formatDate(response.job.jobstartDate)}
                </p>
              </Paper>

              {/* Duration of the Job */}
              <Paper
                elevation={4}
                sx={{
                  width: "70%",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  margin: "1rem auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HourglassTopSharpIcon /> &nbsp; Duration of the Job
                </div>
                <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {response.job.duration}
                </p>
              </Paper>

              {/* Stipend */}
              <Paper
                elevation={4}
                sx={{
                  width: "70%",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  margin: "1rem auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocalAtmIcon /> &nbsp; Salary
                </div>
                <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {response.job.salary}/Month
                </p>
              </Paper>

              {/* Apply By */}
              <Paper
                elevation={4}
                sx={{
                  width: "70%",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  margin: "1rem auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WorkRoundedIcon /> &nbsp; Apply By
                </div>
                <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {formatDate(response.job.deadLine)}{" "}
                </p>
              </Paper>
              <Paper
                elevation={4}
                sx={{
                  width: "70%",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  margin: "1rem auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleAltIcon /> &nbsp; Number of Applicants
                </div>
                <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {response.job.applied.length} Applicants
                </p>
              </Paper>
              <div style={{}}>
                <img
                  style={{
                    width: "80%",
                    margin: "1rem  2rem",
                  }}
                  src={"/hireme3.png"}
                  alt="timer"
                />
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                >
                  Don't miss the oppurtunnity
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="job-bottom">
          <p
            style={{
              marginBottom: "1rem",
              fontSize: "1.4rem",
            }}
          >
            Activity of {response.company[0].name}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <WorkHistorySharpIcon
                sx={{
                  marginRight: "4px",
                }}
              />{" "}
              Recureting since {foramtDate1(response.job.createdAt)}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <GroupsIcon
                sx={{
                  marginRight: "4px",
                }}
              />{" "}
              20 people hired
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <PublishedWithChangesOutlinedIcon
                sx={{
                  marginRight: "4px",
                }}
              />{" "}
              {response.company[0].jobs.length} jobs posted
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Button
            sx={{
              background: "#7e11ea",
              cursor: "pointer",
              color: "white",
              fontWeight: 700,
            }}
            onClick={handleApply}
          >
            Apply Now
          </Button>
          
          <CongratulationBlast show={isApplied} />
        </div>
      </div>
    </div>
  );
};

export default Job;
