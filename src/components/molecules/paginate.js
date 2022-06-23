import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import qs from "query-string";

import { PAGELIMIT } from "../../routes";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
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

export default function Paginate({ total, updateFunction }) {
  const history = useHistory();
  const [prevDots, setPrevDots] = useState(false);
  const [nextDots, setNextDots] = useState(false);
  const query = qs.parse(history.location.search);

  const pages = Math.ceil(parseInt(total || 0) / PAGELIMIT);
  const arr = new Array(pages).fill("");

  let current = (query && query.page) || 0;
  current = parseInt(current);
  return (
    <>
    {total > 0 && <div style={{
      fontSize: "x-large",
      fontWeight: "bold",
      marginTop: "20px"
    }}>{total && <div>{`Showing ${current * PAGELIMIT > total ? total : current * PAGELIMIT} Records of ${total}`}</div>}</div>}
    <Wrapper>
      {current > 1 && (
        <PageNumber
          onClick={() => {
            const q = qs.stringify({
              ...query,
              ...{ page: current - 1, limit: PAGELIMIT },
            });
            history.push({
              search: q,
            });
            updateFunction("?" + q);
          }}
        >
          &laquo; Prev
        </PageNumber>
      )}
      {current > 0 && prevDots && <PageNumber>...</PageNumber>}
      {arr.map((_, index) => {
        if (index < current - 3) {
          if (!prevDots) {
            setPrevDots(true);
          }
          return null;
        }
        if (index > current + 3) {
          if (!nextDots) {
            setNextDots(true);
          }
          return null;
        }
        return (
          <PageNumber
            active={index + 1 === current}
            onClick={() => {
              const q = qs.stringify({
                ...query,
                ...{ page: index + 1, limit: PAGELIMIT },
              });
              history.push({
                search: q,
              });
              updateFunction("?" + q);
            }}
          >
            {index + 1}
          </PageNumber>
        );
      })}
      {current <= pages && nextDots && <PageNumber>...</PageNumber>}
      {current * PAGELIMIT < total && current <= pages && (
        <PageNumber
          onClick={() => {
            const q = qs.stringify({
              ...query,
              ...{ page: current + 1, limit: PAGELIMIT },
            });
            history.push({
              search: q,
            });
            updateFunction("?" + q);
          }}
        >
          &raquo; Next
        </PageNumber>
      )}
    </Wrapper>
    </>
  );
}
