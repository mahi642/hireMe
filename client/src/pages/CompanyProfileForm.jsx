import React, { useState } from "react";
import "./CompanyProfileForm.css";
import Grid from "@mui/joy/Grid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill's styles
import Button from "@mui/material/Button"; // Importing Material-UI Button

const CompanyProfileForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    numberOfEmployees: "",
    companyLogo: "",
    companyFacilities: "",
  });

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
            >
              save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
