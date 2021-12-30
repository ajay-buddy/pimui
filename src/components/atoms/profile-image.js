import React, { useState } from "react";
import styled from "styled-components";
import "../../test.jpeg";

const StyledImage = styled.img`
  border-radius: 50%;
`;
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export default function ProfileImage({ url }) {
  return (
    <StyledContainer>
      {/* <StyledImage src={url} /> */}
      <StyledImage src={"/test.jpeg"} />
    </StyledContainer>
  );
}
