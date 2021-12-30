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

export default function ProjectSection({
  feilds,
  value,
  updateAction,
  newAction,
}) {
  return (
    <Wrapper>
      <Heading onClick={newAction}>Project Details</Heading>
      {value.map((project) => (
        <>
          <ContentWrapper>
            <BoldContent>{project.name}</BoldContent>
            <Content>{`Engagement Type: ${
              project.type && project.type.replace("_", " ")
            }`}</Content>
            <Content>{`Company Name: ${project.company_name}`}</Content>
            <Content>{`From: ${project.start} To: ${project.end}`}</Content>
            <BoldContent>{`Project Description:`}</BoldContent>
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </ContentWrapper>
          <Button onClick={() => updateAction(project)}>Update</Button>
        </>
      ))}
    </Wrapper>
  );
}
