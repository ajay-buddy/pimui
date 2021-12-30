import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { addApplicationRequest } from "../../app/profileSlice";
import Model from "./model";
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
export default function JobCard({ application }) {
  const dispatch = useDispatch();
  const [describe, setDescribe] = useState(false);
  const { job } = application;
  const getDate = (date) => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleDateString("en-US");
  };
  return (
    <Card key={`application-card-${application.id}`}>
      <StyledContainer>
        <StyledContent>{`${job?.name}`}</StyledContent>
        <StyledContent>{`Company Name: ${job?.company_name}`}</StyledContent>
        <StyledContent>{`Employment Type: ${job?.type?.replace(
          "_",
          " "
        )}`}</StyledContent>
        <StyledContent>{`Applied On: ${getDate(
          application.created_at
        )}`}</StyledContent>
        <StyledContent>{`Last Updated: ${getDate(
          application.created_at
        )}`}</StyledContent>
        <StyledContent>{`Stage: ${application.stage}`}</StyledContent>
        <StyledContent>{`Applicants: ${job.applied_count}`}</StyledContent>
        <StyledContent>{`Vaccancies: ${application.vacancies}`}</StyledContent>
        <Button onClick={() => setDescribe(!describe)}>Details</Button>
        <Model show={describe} onClose={() => setDescribe(false)}>
          <StyledContent>Description: </StyledContent>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </Model>
      </StyledContainer>
    </Card>
  );
}
