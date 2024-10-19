import axios from "axios";

// adminLoginService
const adminLoginService = async (email, password) => {
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/adminlogin`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during admin login:", error.message);
    throw error;
  }
};

// getUserDetailsService
const getUserDetailsService = async () => {
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/admin/getUsers`;
    const token = localStorage.getItem("auth-token");

    // Ensure token exists
    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch user details.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw error; // Re-throw the error for handling in the component
  }
};

const userRegisterService = async (email, password, name, role) => {
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/signup`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email, // make sure this is just a string, not an object
        password: password,
        name: name,
        role: role,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error during user registration:", error.message);
  }
};

const userLoginService = async (email, password) => {
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/login`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.error("Error during user login:", error.message);
  }
};

const getAllJobs = async () => {
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/user/alljobs`;

    // Use fetch to get the jobs
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Ensure you set the content type
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch jobs, status: ${response.status}`);
    }

    const data = await response.json();
    console.log("jobdata", data);

    return data;
  } catch (error) {
    console.error("Error in getting all jobs service:", error); // Improved error logging
    throw error; // Rethrow error to be handled by the caller
  }
};

//get job details with comapny using id

const getJobDetailsService = async () => {
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/user/getDetailsById`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Change 'header' to 'headers'
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not ok
    if (!response.ok) {
      throw new Error(
        `Failed to fetch job details, status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in getting job details by ID service:", error);
    throw error;
  }
};

// send data for posting job

const sendJobDetailsService = async (formData) => {
  try {
    const token = localStorage.getItem("auth-token");
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/company/postjob`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        jobRole: formData.jobRole,
        workLocation: formData.workLocation,
        workMode: formData.workMode,
        jobType: formData.jobType,
        experience: formData.experience,
        skills: formData.skills,
        salary: formData.salary,
        duration: formData.duration,
        perks: formData.perks,
        jobDescription: formData.jobDescription,
        qualifications: formData.qualifications,
        numberOfOpenings: formData.numberOfOpenings,
        jobstartDate: formData.jobstartDate, // Date object, ensure correct format in backend
        deadLine: formData.deadLine, // Date object, ensure correct format in backend
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send job data");
    }

    const result = await response.json();
    console.log("Job details sent successfully", result);

    return result;
  } catch (error) {
    console.log("Error in sending job data service:", error);
  }
};

const getJobandCompanyDetailsService = async (jobId) => {
  try {
    const token = localStorage.getItem("auth-token");
    const url1 = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/company/companydetails`;
    const url2 = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/user/getJobDetailsById/${jobId}`;

    // Fetch company details
    const companyResponse = await fetch(url1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!companyResponse.ok) {
      console.log("Error in getting company details in service");
      return;
    }
    const companyData = await companyResponse.json();
    console.log("Company details:", companyData);

    // Fetch job details
    const jobResponse = await fetch(url2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!jobResponse.ok) {
      console.log("Error in getting job details in service");
      return;
    }
    const jobData = await jobResponse.json();

    // Combine both details
    const combinedDetails = {
      company: companyData.company,
      job: jobData.jobData, // Adjusted to reflect "jobData"
    };

    console.log("combined", combinedDetails);

    return combinedDetails;
  } catch (error) {
    console.log("Error in getting details of company and job service", error);
    return error;
  }
};

const jobDetailsService = async (jobId) => {
  try {
    const url = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/user/jobdata/${jobId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Error in getting job details in service");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in servive of job details");
  }
};

const applyJobService = async (jobId) => {
  try {
    const token = localStorage.getItem("auth-token");
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/user/apply/${jobId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!res.ok) {
      console.log("Error in applying job in service");
      return res.status(400);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in applying job service");
    throw error;
  }
};

const getAppliedJobsServive = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/user/appliedJobs`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!response.ok) {
      console.log("Error in response in service");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in getting applied jobs deatails in service");
    throw error;
  }
};

const getBookmarkJobsService = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/user/bookmarkedJobs`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (!response.ok) {
      console.log("Error in response in service");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in getting bookmark jobs in service");
  }
};


const bookmarkJobService = async (jobId) => {
  try {
    const token = localStorage.getItem("auth-token");
    const url = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/user/bookmarkJob/${jobId}`;

    // Await the fetch call to wait for the response
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    // Check if the response is not OK
    if (!response.ok) {
      console.log("Error in response for bookmarking the job");
      return null; // You can return a value or handle the error further
    }

    // Await the response JSON conversion
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in bookmarking the job in service", error);
    return null; // Return null in case of error to handle it properly
  }
};

const getCurrentJobsService =async()=>{
  try{

    const token = localStorage.getItem("auth-token");
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/company/currentjobs`;

    const res = await fetch(url,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":token
      }
    })

    if(!res){
      console.log("Error in response for getting current jobs in service");
    }
    const data = res.json();
    return data;


  }
  catch(e){
    console.log("Error in getting current jobs in service");
    

    throw e;

  }
}



const getPreviousJobsService = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/company/previousjobs`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!res) {
      console.log("Error in response for getting previous jobs in service");
    }
    const data = res.json();
    return data;
  } catch (e) {
    console.log("Error in getting previous jobs in service");

    throw e;
  }
};


 const updateUserProfileService = async (formData) => {
  try {
    const token = localStorage.getItem("auth-token");

    const url = `${import.meta.env.VITE_API_BASE_URL}/api/user/upload`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers:{
        
        "auth-token":token
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    throw error;
  }
};


const getJobApplicationsService = async(jobId)=>{
  try {
    const token = localStorage.getItem("auth-token");
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/company/applications/${jobId}`;

    const response = await fetch(url,{
      method:"GET",
      headers:{
        "auth-token":token,
        "Content-Type":"application/json"
      }
    })

    if(!response){
      throw new Error("Failed to fetch job applications");

    }

    const data = await response.json();
    return data;

    
  } catch (error) {
    
    console.error("Error getting job applications in service : ", error.message);
  }
}


export {
  adminLoginService,
  getUserDetailsService,
  userRegisterService,
  userLoginService,
  getAllJobs,
  getJobDetailsService,
  sendJobDetailsService,
  getJobandCompanyDetailsService,
  jobDetailsService,
  applyJobService,
  getAppliedJobsServive,
  getBookmarkJobsService,
  bookmarkJobService,
  getCurrentJobsService,
  getPreviousJobsService,
  updateUserProfileService,
  getJobApplicationsService
};
