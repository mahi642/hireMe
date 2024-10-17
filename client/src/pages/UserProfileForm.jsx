import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import React, { useState } from "react";
import "./UserProfileForm.css";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Grid, Button } from "@mui/joy";
import ReactQuill from "react-quill";



const UserProfileForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
  };

  const uploadFile = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const S3_BUCKET = "vedio-bucket-s3";
    const REGION = "eu-north-1";

    const s3 = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_GOOGLE_ACCESSKEY_ID, // Use environment variables in a real app
        secretAccessKey: import.meta.env.VITE_GOOGLE_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ACL: "public-read", // Set permissions if needed
    };

    try {
      const data = await s3.send(new PutObjectCommand(params));
      console.log("File uploaded successfully:", data);
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const handleLocation = async () => {
    try {
      const res = await fetch("http://ip-api.com/json");
      const data = await res.json();
      console.log(data); // Handle the location data here
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

 

  return (
    <div className="user-profile-container">
      <div className="user-profile-form">
        <p className="user-profile-head">User Profile</p>
        <form className="user-profile-inputs" onSubmit={uploadFile}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Name</label>
                <input
                  type="text"
                  name="userName"
                  placeholder="Enter your name"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Email</label>
                <input
                  type="email"
                  name="userEmail"
                  placeholder="Enter your Email"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Highest Education</label>
                <select>
                  <option value="high-school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">Ph.D.</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label>Location</label>
                  <p
                    onClick={handleLocation}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Get Location
                    <AddLocationIcon sx={{ marginLeft: "0.5rem" }} />
                  </p>
                </div>
                <input type="text" />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Experience</label>
                <input
                  type="experience"
                  name="userExperience"
                  placeholder="Enter your experience(in years)"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Skills</label>
                <input
                  type="text"
                  name="userskills"
                  placeholder="Enter your Skills"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="user-profile-input">
                <label>Upload your recent resume</label>
                <input type="file" onChange={handleFileChange} />
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <div className="user-profile-input">
              <label>About Yourself</label>
              <ReactQuill/>
             
            </div>
          </Grid>

          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#e38d3f",
                margin: "1rem ",
                padding: "0.5rem 2rem",
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#e38d3f",
                margin: "1rem ",
                padding: "0.5rem 2rem",
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
