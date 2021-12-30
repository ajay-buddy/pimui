import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import ProfileImage from "../atoms/profile-image";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.span`
  margin-top: 10px;
`;

const BoldContent = styled.span`
  margin-top: 10px;
  font-weight: bold;
`;

const Heading = styled.div`
  margin-top: 10px;
  font-weight: bold;
  background-color: grey;
  font-size: 25px;
  padding: 10px;
`;

export default function ExperienceSection({
  feilds,
  value,
  updateAction,
  newAction,
}) {
  return (
    <Wrapper>
      <Heading onClick={newAction}>Experience Details</Heading>
      {value.map((experience) => (
        <>
          <ContentWrapper>
            <BoldContent>{experience.company_name}</BoldContent>
            <Content>{`Employment Type: ${
              experience.type && experience.type.replace("_", " ")
            }`}</Content>
            <Content>{`From: ${experience.start} To: ${experience.end}`}</Content>
            <BoldContent>{`Job Description:`}</BoldContent>
            <div dangerouslySetInnerHTML={{ __html: experience.description }} />
            <Content>{`Currently Working: ${
              experience.is_present ? "Yes" : "No"
            }`}</Content>
          </ContentWrapper>
          <Button onClick={() => updateAction(experience)}>Update</Button>
        </>
      ))}
    </Wrapper>
  );
}
