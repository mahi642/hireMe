import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getJobApplicationsService } from "../service/service";
import "./AppliedUsers.css";
import CompanyMenubar from "../components/CompanyMenubar";

const AppliedUsers = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    const result = await getJobApplicationsService(jobId);
    if (result) {
      setApplicants(result.applicants); // Adjust this based on your actual API response structure
    }
  };

  useEffect(() => {
    fetchData();
  }, [jobId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="applied-users">
      <div
        style={{
          display: "flex",
         
        }}
      >
        <CompanyMenubar />

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Resume</TableCell>
                  <TableCell>Shortlisted</TableCell>
                  <TableCell>Selected</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applicants
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((applicant) => (
                    <TableRow key={applicant.user._id}>
                      <TableCell>{applicant.user.name}</TableCell>
                      <TableCell>{applicant.user.email}</TableCell>
                      <TableCell>{applicant.user.location}</TableCell>
                      <TableCell>{applicant.user.experience} years</TableCell>
                      <TableCell>
                        {Array.isArray(applicant.user.skills)
                          ? applicant.user.skills.join(", ")
                          : "No skills listed"}
                      </TableCell>
                      <TableCell>
                        {applicant.user.resume ? (
                          <a
                            href={applicant.user.resume.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resume
                          </a>
                        ) : (
                          "No Resume"
                        )}
                      </TableCell>
                      <TableCell>
                        {applicant.shortlisted ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>{applicant.selected ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={applicants.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default AppliedUsers;
