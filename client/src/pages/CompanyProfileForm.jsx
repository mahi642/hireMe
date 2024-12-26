import React, { useState,useEffect } from "react";
import "./CompanyProfileForm.css";
import Grid from "@mui/joy/Grid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill's styles
import Button from "@mui/material/Button"; // Importing Material-UI Button
import { useNavigate } from "react-router-dom";
import { updateCompanyDetails } from "../service/service";


const CompanyProfileForm = () => {
  const [triggerSave, setTriggerSave] = useState(false); // State to trigger fetch
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    numberOfEmployees: "",
    companyLogo: "",
    companyFacilities: "",
  });

  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const data = await updateCompanyDetails(formData);
      if (!data) {
        alert("Failed to fetch company details");
      } else {
        console.log("Form data is", data);
        navigate("/company/profile"); 
      }
    } catch (error) {
      console.error("Error in fetching company details:", error);
      alert(
        "An error occurred while fetching company details. Please try again."
      );
    }
  };

  // Trigger fetchDetails when `triggerSave` becomes true
  useEffect(() => {
    if (triggerSave) {
      fetchDetails().finally(() => setTriggerSave(false)); // Reset trigger after fetch
    }
  }, [triggerSave]);

  const handleSave = () => {
    if (!formData || Object.keys(formData).length === 0) {
      alert("Please fill out the form before saving.");
      return;
    }
    setTriggerSave(true); // Trigger fetchDetails
  };
  const handleCancel = () => {
    navigate("/company/profile");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data Submitted:", formData);
    // You can handle form submission logic here (e.g., send data to API)
  };
  console.log(formData);
  return (
    <div className="company-profile-container">
      <div className="company-profile-form">
        <p className="company-profile-head">Company Profile</p>

        <form className="company-profile-inputs" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Company Name */}
            <Grid item xs={12} md={6}>
              <div className="company-profile-input">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>

            {/* Number of Employees */}
            <Grid item xs={12} md={6}>
              <div className="company-profile-input">
                <label>Number of Employees</label>
                <input
                  type="number"
                  name="numberOfEmployees"
                  placeholder="Enter number of employees"
                  value={formData.numberOfEmployees}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>

            {/* Company Logo */}
            <Grid item xs={12} md={6}>
              <div className="company-profile-input">
                <label>Company Logo</label>
                <input
                  type="file"
                  name="companyLogo"
                  onChange={(e) =>
                    setFormData({ ...formData, companyLogo: e.target.files[0] })
                  }
                />
              </div>
            </Grid>

            {/* Company Description */}
            <Grid item xs={12}>
              <div className="company-profile-input">
                <label>Company Description</label>
                <ReactQuill
                  theme="snow"
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={(value) =>
                    setFormData({ ...formData, companyDescription: value })
                  }
                />
              </div>
            </Grid>

            {/* Facilities at Company */}
            <Grid item xs={12}>
              <div className="company-profile-input">
                <label>Facilities at Company</label>
                <ReactQuill
                  theme="snow"
                  name="companyFacilities"
                  value={formData.companyFacilities}
                  onChange={(value) =>
                    setFormData({ ...formData, companyFacilities: value })
                  }
                />
              </div>
            </Grid>
          </Grid>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#e38d3f",
                margin: "1rem",
              }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#e38d3f",
                margin: "1rem",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
