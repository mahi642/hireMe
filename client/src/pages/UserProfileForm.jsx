import React, { useState } from "react";
import "./UserProfileForm.css";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Grid, Button } from "@mui/joy";
import ReactQuill from "react-quill"; // Import for the text editor
import { updateUserProfileService } from "../service/service";
import { useNavigate } from "react-router-dom";
const UserProfileForm = () => {
  const [file, setFile] = useState(null);
  const [aboutYourself, setAboutYourself] = useState("");
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("userName", form.userName.value);
    formData.append("userEmail", form.userEmail.value);
    formData.append("highestEducation", form.highestEducation.value);
    formData.append("location", form.location.value);
    formData.append("userExperience", form.userExperience.value);
    formData.append("userSkills", form.userskills.value);
    formData.append("aboutYourself", aboutYourself);

    if (file) {
      formData.append("resume", file);
    } else {
      alert("Please select a file first.");
      return;
    }

    try {
      const data = await updateUserProfileService(formData);
      alert("Profile updated successfully.");
      navigate("/profile");

    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  const handleLocation = async () => {
    try {
      const res = await fetch("http://ip-api.com/json");
      const data = await res.json();
      console.log(data);
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
                  required
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Email</label>
                <input
                  type="email"
                  name="userEmail"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Highest Education</label>
                <select name="highestEducation" required>
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
                <input type="text" name="location" required />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Experience (in years)</label>
                <input
                  type="number"
                  name="userExperience"
                  placeholder="Enter your experience"
                  required
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="user-profile-input">
                <label>Skills</label>
                <input
                  type="text"
                  name="userskills"
                  placeholder="Enter your skills"
                  required
                />
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <div className="user-profile-input">
                <label>Upload your recent resume</label>
                <input type="file" onChange={handleFileChange} required />
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <div className="user-profile-input">
                <label>About Yourself</label>
                <ReactQuill
                  value={aboutYourself}
                  onChange={setAboutYourself} // Update state for ReactQuill
                  name="aboutYourself"
                  placeholder="Tell something about yourself"
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
                padding: "0.5rem 2rem",
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#e38d3f",
                margin: "1rem",
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
