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

export default function EducationSection({
  feilds,
  value,
  updateAction,
  newAction,
}) {
  return (
    <Wrapper>
      <Heading onClick={newAction}>Education Details</Heading>
      {value.map((education) => (
        <>
          <ContentWrapper>
            <BoldContent>{education.name}</BoldContent>
            <Content>{`Course Type: ${
              education.type && education.type.replace("_", " ")
            }`}</Content>
            <Content>{`From: ${education.start} To: ${education.end}`}</Content>
            <Content>{`Collage: ${education.collage_name}`}</Content>
            <Content>{`University: ${education.university_name}`}</Content>
          </ContentWrapper>
          <Button onClick={() => updateAction(education)}>Update</Button>
        </>
      ))}
    </Wrapper>
  );
}
