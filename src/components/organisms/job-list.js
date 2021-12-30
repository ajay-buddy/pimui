import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import history from "../../history";
import Paginate from "../molecules/paginate";
import { jobCountSelector } from "../../app/profileSlice/index";
import JobCard from "../molecules/job-card";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default function JobList({ jobData, onClick }) {
  const totalCount = useSelector(jobCountSelector);
  return (
    <Wrapper>
      {jobData.map((job) => (
        <JobCard onClick={onClick} job={job} />
      ))}
      <Paginate total={totalCount} />
    </Wrapper>
  );
}
