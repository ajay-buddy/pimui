import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import history from "../../history";
import Paginate from "../molecules/paginate";
import {
  applicationCountSelector,
  jobCountSelector,
} from "../../app/profileSlice/index";
import ApplicationCard from "../molecules/application-card";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default function ApplicationList({ applicationData }) {
  const totalCount = useSelector(applicationCountSelector);
  return (
    <Wrapper>
      {applicationData.map((application) => (
        <ApplicationCard
          // onClick={onClick}
          application={application}
        />
      ))}
      <Paginate total={totalCount} />
    </Wrapper>
  );
}
