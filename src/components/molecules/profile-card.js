import React from "react";
import styled from "styled-components";
import ProfileImage from "../atoms/profile-image";
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
const StledContent = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0px;
`;
export default function ProfileCard({ profile, url, onClick }) {
  return (
    <Card onClick={onClick}>
      <ProfileImage url={`${S3URL}${profile.id}`} />
      <StyledContainer>
        <StledContent>
          {`${profile.first_name} ${profile.last_name}`}
        </StledContent>
        <StledContent>{profile.email}</StledContent>

        {/* <p>Architect & Engineer</p> */}
      </StyledContainer>
    </Card>
  );
}
