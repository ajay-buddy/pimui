import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Message = styled.span`
  color: red;
`;

export default function Error({ messages }) {
  return (
    <Wrapper>
      {messages &&
        messages.length > 0 &&
        messages.map(({ message }) => <Message>*{message}</Message>)}
    </Wrapper>
  );
}
