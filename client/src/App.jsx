import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Aboutus from "./pages/Aboutus";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { GoogleLogin } from '@react-oauth/google';
import CompanyHome from "./pages/CompanyHome";

import "./App.css";
import FindjobSearch from "./components/FindjobSearch";
import PostaJob from "./pages/PostaJob";
import CompanyProfileForm from "./pages/CompanyProfileForm";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import UserDetails from "./pages/UserDetails";
import UserProfileForm from "./pages/UserProfileForm";
import Job from "./pages/Job";
import Profile from "./pages/Profile"
import UserBookmarks from "./pages/UserBookmarks";
function App() {

  return (
    <div className="app-container">
     

      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path = "/jobSearch" element ={<FindjobSearch/>}/>
            <Route path = "/postjob"  element ={<PostaJob/>}/>
            <Route path = "/company/profile"  element ={<CompanyProfileForm/>}/>
            <Route path="/companyHome" element={<CompanyHome/>}/>
            <Route path ="/adminLogin" element ={<AdminLogin/>}/>
            <Route path = "/adminhome" element = {<AdminHome/>}/>
            <Route path = "/admin/users" element = {<UserDetails/>}/>
            <Route path = "/user/profile" element ={<UserProfileForm/>}/>
            <Route path="/user/job/:jobId" element ={<Job/>}/>
            <Route path="/user/home" element ={<Profile/>}/>
            <Route path ="/user/bookmarks" element = {<UserBookmarks/>}/>
            
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;