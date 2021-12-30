import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import ProfileImage from "../atoms/profile-image";

const Wrapper = styled.div`
  max-width: 30%;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const ContentWrapper = styled.div`
  display: flex;
`;
const Content = styled.span`
  margin-top: 10px;
`;

const BoldContent = styled.span`
  margin-top: 10px;
  font-weight: bold;
`;

export default function ProfileBar({ feilds, value, updateAction }) {
  return (
    <Wrapper>
      <ProfileImage
      //   url={`${S3URL}${profileData.id}`}
      />
      <BoldContent>{`${value.first_name} ${value.last_name}`}</BoldContent>
      <Content>{value.email}</Content>
      <Content>{value.phone}</Content>
      <Content>{value.alternatePhone}</Content>
      <Content>{value.active ? "Available" : "Not Available"}</Content>
      <Content>{value.engaged ? "Engaged" : "Not Engaged"}</Content>
      <Content>{`Address: ${value.address}, ${value.city}, ${value.state}, ${value.country} - ${value.code}`}</Content>
      <Button onClick={updateAction}>Update Profile</Button>
    </Wrapper>
  );
}
