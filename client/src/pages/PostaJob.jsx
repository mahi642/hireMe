import React, { useState } from "react";
import { Grid, Button } from "@mui/joy";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PostaJob.css";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendJobDetailsService } from "../service/service";
import CompanyMenubar from "../components/CompanyMenubar";

const PostaJob = () => {
  const [formData, setFormData] = useState({
    jobRole: "",
    workLocation: "",
    workMode: "",
    jobType: "",
    experience: "",
    skills: "",
    salary: "",
    duration: "",
    perks: "",
    jobDescription: "",
    qualifications: "",

    numberOfOpenings:"",
   jobstartDate:(new Date()),
   deadLine:(new Date())
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const result = await sendJobDetailsService(formData);
    if(result){
      alert("Job posted successfully")
    }
    else{
      alert("Failed to post job");
    }


  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };
  
   const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

  return (
    <div style = {{
      display:"flex"
    }}>
      <CompanyMenubar/>
      <div className="postjob">
        <div className="form">
          <p className="postjob-head">Posting a new Job</p>
          <form className="form-inputs" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Job Role */}
              <Grid item xs={12} sm={6} >
                <div className="form-input">
                  <label>Job Role</label>
                  <input
                    type="text"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                    placeholder="Enter the required role"
                  />
                </div>
              </Grid>
              {/* Work Location */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Work Location</label>
                  <input
                    type="text"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={handleInputChange}
                    placeholder="Enter the location"
                  />
                </div>
              </Grid>
              {/* Work Mode */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Work Mode</label>
                  <input
                    type="text"
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleInputChange}
                    placeholder="Enter the work mode"
                  />
                </div>
              </Grid>
              {/* Job Type */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Job Type</label>
                  <input
                    type="text"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    placeholder="Enter the job type"
                  />
                </div>
              </Grid>
              {/* Experience */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Required Work Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Enter in years"
                  />
                </div>
              </Grid>
              {/* Skills */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Required Major Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="Enter the major skills"
                  />
                </div>
              </Grid>
              {/* Salary */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="Enter the salary"
                  />
                </div>
              </Grid>
              {/* Job Duration */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Job Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Enter the job duration"
                  />
                </div>
              </Grid>
              {/* Perks */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Perks</label>
                  <input
                    type="text"
                    name="perks"
                    value={formData.perks}
                    onChange={handleInputChange}
                    placeholder="Enter the given perks"
                  />
                </div>
              </Grid>

              {/* number of openings */}

              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Number of openings</label>
                  <input
                    type="number"
                    name="numberOfOpenings"
                    value={formData.numberOfOpenings}
                    onChange={handleInputChange}
                    placeholder="Enter the number of openings"
                  />
                </div>
              </Grid>

              {/* job start date */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Job Start Date</label>
                  <div
                    style={{
                      backgroundColor: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <DatePicker
                      selected={formData.jobstartDate}
                      onChange={(date) =>
                        handleDateChange(date, "jobstartDate")
                      }
                      customInput={
                        <input
                          type="text"
                          style={{
                            border: "none",
                            color: "white",
                            background: "transparent",
                            padding: "10px",
                            outline: "none",
                          }}
                          placeholder="Enter the job start date"
                        />
                      }
                    />
                    <TodayOutlinedIcon
                      onClick={() =>
                        document
                          .querySelector("input[name='startDate']")
                          .focus()
                      }
                      style={{ cursor: "pointer", color: "white" }}
                    />
                  </div>
                </div>
              </Grid>

              {/* Last Date to Apply */}
              <Grid item xs={12} sm={6}>
                <div className="form-input">
                  <label>Last Date to Apply</label>
                  <div
                    style={{
                      backgroundColor: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <DatePicker
                      selected={formData.deadLine}
                      onChange={(date) => handleDateChange(date, "deadLine")}
                      customInput={
                        <input
                          type="text"
                          style={{
                            border: "none",
                            color: "white",
                            background: "transparent",
                            padding: "10px",
                            outline: "none",
                          }}
                          placeholder="Enter the last date to apply"
                        />
                      }
                    />
                    <TodayOutlinedIcon
                      onClick={() =>
                        document.querySelector("input[name='deadLine']").focus()
                      }
                      style={{ cursor: "pointer", color: "white" }}
                    />
                  </div>
                </div>
              </Grid>
              {/* About the company */}

              {/* Job Description */}
              <Grid item xs={12}>
                <div className="form-input">
                  <label>Job Description</label>
                  <ReactQuill
                    theme="snow"
                    value={formData.jobDescription}
                    onChange={(value) =>
                      handleEditorChange("jobDescription", value)
                    }
                  />
                </div>
              </Grid>

              {/* Qualifications */}
              <Grid item xs={12}>
                <div className="form-input">
                  <label>Minimum Qualifications and Eligibility</label>
                  <ReactQuill
                    theme="snow"
                    value={formData.qualifications}
                    onChange={(value) =>
                      handleEditorChange("qualifications", value)
                    }
                  />
                </div>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#e38d3f", margin: "1rem" }}
              >
                Submit Job
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostaJob;
