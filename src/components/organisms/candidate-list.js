import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import history from "../../history";
import ProfileCard from "../molecules/profile-card";
import Paginate from "../molecules/paginate";
import { profileCountSelector } from "../../app/profileSlice/index";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default function CandidateList({ profileData }) {
  const totalCount = useSelector(profileCountSelector);
  return (
    <Wrapper>
      {profileData.map((profile) => (
        <ProfileCard
          profile={profile}
          onClick={() => history.push(`/profile/${profile.id}`)}
        />
      ))}
      <Paginate total={totalCount} />
    </Wrapper>
  );
}
