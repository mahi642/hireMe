// schema.js
const { gql } = require("apollo-server");

const typeDefs = gql`
  type Job {
    id: ID!
    title: String! # Changed to title to reflect the job role
    company: String! # Should reference the company ID or name if desired
    salary: String! # Changed to String to accommodate ranges
    location: String
    createdAt: String
  }

  type Query {
    userCount: Int!
    companyCount: Int!
    jobCount: Int!
    jobs: [Job!]! # Query to get all jobs
  }
`;

module.exports = typeDefs;
