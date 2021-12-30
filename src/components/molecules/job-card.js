import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Model from "./model";
import { addApplicationRequest } from "../../app/profileSlice";
const S3URL = "https://ats-profile-picture.s3.ap-south-1.amazonaws.com/";
const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  min-width: 300px;
  margin: 20px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StyledContainer = styled.div`
  padding: 2px 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const StyledContent = styled.div`
  display: flex;
  justify-content: start;
  margin: 5px 0px;
`;
export default function JobCard({ job, onClick }) {
  const dispatch = useDispatch();
  const [describe, setDescribe] = useState(false);
  return (
    <Card key={`job-card-${job.id}`}>
      <StyledContainer>
        <StyledContent>{`${job.name}`}</StyledContent>
        <StyledContent>{`Company Name: ${job.company_name}`}</StyledContent>
        <StyledContent>{`Active: ${job.is_active}`}</StyledContent>
        <StyledContent>{`created: ${job.created_at}`}</StyledContent>
        <StyledContent>{`Last Updated: ${job.updated_at}`}</StyledContent>
        <StyledContent>{`Vacancies: ${job.vacancies}`}</StyledContent>
        <StyledContent>{`Applications: ${job.applied_count}`}</StyledContent>
        <StyledContent>{`Type: ${job.type}`}</StyledContent>
        <Button onClick={() => setDescribe(!describe)}>View Details</Button>
        <Button onClick={() => onClick(job)}>Edit</Button>
        <Button
          onClick={() => dispatch(addApplicationRequest({ job: job.id }))}
        >
          Apply
        </Button>
        <Model show={describe} onClose={() => setDescribe(false)}>
          <StyledContent>Description: </StyledContent>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </Model>
      </StyledContainer>
    </Card>
  );
}
