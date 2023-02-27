import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "../jobs/JobCard";
import "../jobs/Jobs.css";

const CompanyJobs = () => {
  const [company, setCompany] = useState("");
  const [jobs, setJobs] = useState("");

  const { handle } = useParams();

  useEffect(() => {
    async function getCompanyJobs() {
      const res = await JoblyApi.getCompany(handle);
      setCompany(res);
      setJobs(res.jobs);
    }
    getCompanyJobs();
  }, []);

  return (
    <div id="wrapper">
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <p>
        <b>Company size: </b>
        {company.numEmployees}
      </p>
      <h3>Avialable Jos:</h3>
      {jobs
        ? jobs.map((job) => {
            return <JobCard job={job} key={job.id} />;
          })
        : "No job posted yet..."}
    </div>
  );
};

export default CompanyJobs;