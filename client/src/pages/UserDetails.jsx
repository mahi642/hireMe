import React from "react";
import "./UserDetails.css"; // Ensure your CSS file is properly styled
import AdminMenubar from "../components/AdminMenubar";
import PaginationTable from "../components/PaginationTable";

const UserDetails = () => {
  const dummyUserDetails = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      age: 30,
      gender: "Male",
      currentPosition: "Software Engineer",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      age: 28,
      gender: "Female",
      currentPosition: "Project Manager",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      age: 28,
      gender: "Female",
      currentPosition: "Project Manager",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "456-789-1234",
      age: 35,
      gender: "Female",
      currentPosition: "UI/UX Designer",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phoneNumber: "789-123-4567",
      age: 40,
      gender: "Male",
      currentPosition: "DevOps Engineer",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "456-789-1234",
      age: 35,
      gender: "Female",
      currentPosition: "UI/UX Designer",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phoneNumber: "789-123-4567",
      age: 40,
      gender: "Male",
      currentPosition: "DevOps Engineer",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "987-654-3210",
      age: 28,
      gender: "Female",
      currentPosition: "Project Manager",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "456-789-1234",
      age: 35,
      gender: "Female",
      currentPosition: "UI/UX Designer",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phoneNumber: "789-123-4567",
      age: 40,
      gender: "Male",
      currentPosition: "DevOps Engineer",
    },
    {
      name: "Charlie White",
      email: "charlie.white@example.com",
      phoneNumber: "321-654-9870",
      age: 45,
      gender: "Male",
      currentPosition: "Data Scientist",
    },
    {
      name: "Daisy Green",
      email: "daisy.green@example.com",
      phoneNumber: "654-321-0987",
      age: 32,
      gender: "Female",
      currentPosition: "Marketing Specialist",
    },
    {
      name: "Eve Black",
      email: "eve.black@example.com",
      phoneNumber: "987-123-4560",
      age: 29,
      gender: "Female",
      currentPosition: "Content Writer",
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <AdminMenubar />
      <div className="user-details-container">
        <PaginationTable users={dummyUserDetails} />
      </div>
    </div>
  );
};

export default UserDetails;
