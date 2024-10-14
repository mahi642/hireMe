import React, { useState, useEffect } from "react";
import UserSidebar from "../components/UserSideBar";
import JobsTemplate from "../components/JobTemplate"; // Fixed typo in component name
import { getAppliedJobsServive } from "../service/service";

const Profile = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const result = await getAppliedJobsServive();

    if (!result) {
      console.log("Error in getting result");
    } else {
      setData(result.jobs);
    }
    console.log(result); 
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function inside useEffect
  }, []); // Empty dependency array to run only once on mount

  return (
    <div style={{ display: "flex" }}>
      <UserSidebar />
      <div style={{ marginLeft: "20px", flexGrow: 1 }}>
        <JobsTemplate title={"Applied Jobs"} data={data} />
        {/* Render JobsTemplate with data */}
      </div>
    </div>
  );
};

export default Profile;
