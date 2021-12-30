import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const ContentWrapper = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;
const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: default;
`;

export default function Model(props) {
  const { show, onClose, children } = props;
  //   const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <Wrapper>
      <ContentWrapper show={show}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
}
