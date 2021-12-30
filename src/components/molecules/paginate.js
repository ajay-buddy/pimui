import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ROUTES } from "../../routes";
import history from "../../history";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const PageNumber = styled.a`
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  background-color: ${({ active }) => (active ? "green" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  &:hover {
    background-color: #ddd;
  }
`;

const LIMIT = 10;
export default function Paginate({ total }) {
  const t = Math.ceil(parseInt(total) / LIMIT);
  const { search } = history.location;
  const arr = new Array(t).fill("");
  const getPage = () => {
    if (search) {
      const temp = search.split("page=")[1];
      if (temp) {
        return parseInt(temp.split("&")[0]) || 1;
      }
    }
    return 1;
  };
  const currentPage = getPage();
  return (
    <Wrapper>
      {currentPage > 1 && (
        <PageNumber
          href={`${history.location.pathname}?page=${
            currentPage - 1
          }&limit=${LIMIT}`}
        >
          &laquo;
        </PageNumber>
      )}
      {arr.map((_, i) => (
        <PageNumber
          href={`${history.location.pathname}?page=${i + 1}&limit=${LIMIT}`}
        >
          {i + 1}
        </PageNumber>
      ))}

      {currentPage < t && (
        <PageNumber
          href={`${history.location.pathname}?page=${
            currentPage + 1
          }&limit=${LIMIT}`}
        >
          &raquo;
        </PageNumber>
      )}
    </Wrapper>
  );
}
